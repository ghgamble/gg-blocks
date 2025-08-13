import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	PanelColorSettings
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	RangeControl,
	SelectControl,
	Notice
} from '@wordpress/components';
import { useEffect, useRef, useState } from '@wordpress/element';

/** ---------- Silver base + Accent helpers ---------- */
const SILVER_BASE = [
	{ elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
	{ elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
	{ elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
	{ elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f5' }] },
	{ featureType: 'administrative.land_parcel', elementType: 'labels.text.fill', stylers: [{ color: '#bdbdbd' }] },
	{ featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#eeeeee' }] },
	{ featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
	{ featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#e5e5e5' }] },
	{ featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
	{ featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
	{ featureType: 'road.arterial', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
	{ featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#dadada' }] },
	{ featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
	{ featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
	{ featureType: 'transit.line', elementType: 'geometry', stylers: [{ color: '#e5e5e5' }] },
	{ featureType: 'transit.station', elementType: 'geometry', stylers: [{ color: '#eeeeee' }] },
	{ featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] }
];

function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }
function hexToRgb(hex) {
	const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
	if (!m) return { r: 201, g: 201, b: 201 };
	return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}
function rgbToHex({ r, g, b }) {
	const toHex = (v) => v.toString(16).padStart(2, '0');
	return `#${toHex(clamp(Math.round(r),0,255))}${toHex(clamp(Math.round(g),0,255))}${toHex(clamp(Math.round(b),0,255))}`;
}
function mix(c1, c2, ratio) {
	const inv = 1 - ratio;
	return {
		r: c1.r * inv + c2.r * ratio,
		g: c1.g * inv + c2.g * ratio,
		b: c1.b * inv + c2.b * ratio,
	};
}
function lighten(hex, pct) {
	const c = hexToRgb(hex);
	const w = { r: 255, g: 255, b: 255 };
	return rgbToHex(mix(c, w, pct));
}

// Build silver style tinted by accent
function silverWithAccent(accentHex) {
	const water = accentHex;
	const park = lighten(accentHex, 0.75);
	const highway = lighten(accentHex, 0.85);
	const transit = lighten(accentHex, 0.8);

	const custom = [
		{ featureType: 'water', elementType: 'geometry', stylers: [{ color: water }] },
		{ featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: park }] },
		{ featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: highway }] },
		{ featureType: 'transit.line', elementType: 'geometry', stylers: [{ color: transit }] },
	];

	return [
		...SILVER_BASE.filter(s =>
			!(
				(s.featureType === 'water' && s.elementType === 'geometry') ||
				(s.featureType === 'poi.park' && s.elementType === 'geometry') ||
				(s.featureType === 'road.highway' && s.elementType === 'geometry') ||
				(s.featureType === 'transit.line' && s.elementType === 'geometry')
			)
		),
		...custom
	];
}

// Google Maps async loader with callback (prevents "Map is not a constructor")
function loadGoogleMaps(apiKey) {
	return new Promise((resolve, reject) => {
		if (window.google?.maps?.Map) return resolve(window.google.maps);

		if (!apiKey) return reject(new Error('Missing Google Maps API key'));

		if (window.__ggbMapsReady_resolve) {
			window.__ggbMapsReady_resolve.push(resolve);
			return;
		}
		window.__ggbMapsReady_resolve = [resolve];

		window.__ggbMapsReady = () => {
			(window.__ggbMapsReady_resolve || []).forEach(fn => fn(window.google.maps));
			window.__ggbMapsReady_resolve = null;
		};

		const s = document.createElement('script');
		s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&v=weekly&loading=async&callback=__ggbMapsReady`;
		s.async = true;
		s.defer = true;
		s.onerror = () => reject(new Error('Google Maps failed to load'));
		document.head.appendChild(s);
	});
}

export default function Edit({ attributes, setAttributes }) {
	const {
		address,
		phone,
		emailAddress,
		emailSubject,
		emailDisplayText,
		hours,
		showMap,
		backgroundColor,
		iconColor,
		lat,
		lng,
		zoom,
		mapTypeId,
		mapAccentColor
	} = attributes;

	const blockProps = useBlockProps({
		className: 'contact-info',
		style: { backgroundColor }
	});

	const encodedAddress = encodeURIComponent((address || '').trim());
	const fallbackMapSrc = showMap && address
		? `https://maps.google.com/maps?q=${encodedAddress}&output=embed`
		: null;

	const mapRef = useRef(null);
	const markerRef = useRef(null);
	const gmapRef = useRef(null);
	const autocompleteInputRef = useRef(null);
	const [mapsReady, setMapsReady] = useState(false);
	const [mapsError, setMapsError] = useState('');
	const [searchQuery, setSearchQuery] = useState('');

	// Load Maps only when needed
	useEffect(() => {
		if (!showMap) return;
		const apiKey = window.ggBlocks?.googleMapsApiKey;
		loadGoogleMaps(apiKey)
			.then(() => setMapsReady(true))
			.catch((err) => setMapsError(err.message || 'Google Maps failed to load'));
	}, [showMap]);

	// Init / update map in editor
	useEffect(() => {
		if (!mapsReady || !mapRef.current || !window.google?.maps?.Map) return;

		const center = (lat != null && lng != null)
			? { lat: Number(lat), lng: Number(lng) }
			: { lat: 39.7392, lng: -104.9903 };

		const styles = silverWithAccent(mapAccentColor || '#2c944b');

		if (!gmapRef.current) {
			gmapRef.current = new google.maps.Map(mapRef.current, {
				center,
				zoom: zoom || 14,
				mapTypeId: mapTypeId || 'roadmap',
				styles,
				fullscreenControl: false,
				streetViewControl: false,
				rotateControl: false
			});
		} else {
			gmapRef.current.setCenter(center);
			if (zoom) gmapRef.current.setZoom(zoom);
			if (mapTypeId) gmapRef.current.setMapTypeId(mapTypeId);
			gmapRef.current.setOptions({ styles });
		}

		if (!markerRef.current) {
			markerRef.current = new google.maps.Marker({
				map: gmapRef.current,
				position: center,
				draggable: true
			});
			markerRef.current.addListener('dragend', (e) => {
				const pos = e.latLng;
				setAttributes({ lat: pos.lat(), lng: pos.lng() });
				const geocoder = new google.maps.Geocoder();
				geocoder.geocode({ location: pos }, (results, status) => {
					if (status === 'OK' && results && results[0]) {
						setAttributes({ address: results[0].formatted_address });
					}
				});
			});
		} else {
			markerRef.current.setPosition(center);
		}
	}, [mapsReady, lat, lng, zoom, mapTypeId, mapAccentColor, setAttributes]);

	// Places autocomplete
	useEffect(() => {
		if (!mapsReady || !autocompleteInputRef.current || !window.google?.maps?.places) return;
		const ac = new google.maps.places.Autocomplete(autocompleteInputRef.current, {
			fields: ['geometry', 'formatted_address', 'name']
		});
		ac.addListener('place_changed', () => {
			const place = ac.getPlace();
			if (!place.geometry?.location) return;
			const pos = place.geometry.location;
			setAttributes({
				lat: pos.lat(),
				lng: pos.lng(),
				address: place.formatted_address || place.name || address
			});
			if (gmapRef.current) {
				gmapRef.current.setCenter(pos);
				gmapRef.current.setZoom(16);
			}
			if (markerRef.current) markerRef.current.setPosition(pos);
			setSearchQuery('');
		});
		return () => google.maps.event.clearInstanceListeners(ac);
	}, [mapsReady]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'gg-blocks')} initialOpen={true}>
					<ToggleControl
						label={__('Show Map', 'gg-blocks')}
						checked={showMap}
						onChange={(value) => setAttributes({ showMap: value })}
					/>

					<TextControl
						label={__('Email Address (for mailto:)', 'gg-blocks')}
						value={emailAddress}
						onChange={(value) => setAttributes({ emailAddress: value })}
						placeholder="example@email.com"
					/>

					<TextControl
						label={__('Email Subject (optional)', 'gg-blocks')}
						value={emailSubject}
						onChange={(value) => setAttributes({ emailSubject: value })}
						placeholder="I'd like to get in touch"
					/>
				</PanelBody>

				<PanelColorSettings
					title={__('Background Color', 'gg-blocks')}
					colorSettings={[
						{
							value: backgroundColor,
							onChange: (color) => setAttributes({ backgroundColor: color }),
							label: __('Background Color', 'gg-blocks'),
						}
					]}
				/>

				<PanelColorSettings
					title={__('Icon Color', 'gg-blocks')}
					colorSettings={[
						{
							value: iconColor,
							onChange: (color) => setAttributes({ iconColor: color }),
							label: __('Font Awesome Icon Color', 'gg-blocks'),
						}
					]}
				/>

				{showMap && (
					<PanelBody title={__('Map', 'gg-blocks')} initialOpen={true}>
						{!mapsReady && mapsError && (
							<Notice status="warning" isDismissible={false}>
								{__('Google Maps not available – using iframe preview.', 'gg-blocks')}
							</Notice>
						)}

						<TextControl
							label={__('Search a place to set the marker', 'gg-blocks')}
							value={searchQuery}
							onChange={setSearchQuery}
							ref={autocompleteInputRef}
						/>

						<RangeControl
							label={__('Zoom', 'gg-blocks')}
							value={zoom || 14}
							onChange={(value) => setAttributes({ zoom: value })}
							min={1}
							max={21}
						/>

						<SelectControl
							label={__('Map Type', 'gg-blocks')}
							value={mapTypeId}
							onChange={(value) => setAttributes({ mapTypeId: value })}
							options={[
								{ label: 'Roadmap', value: 'roadmap' },
								{ label: 'Satellite', value: 'satellite' },
								{ label: 'Hybrid', value: 'hybrid' },
								{ label: 'Terrain', value: 'terrain' }
							]}
						/>
					</PanelBody>
				)}

				{showMap && (
					<PanelColorSettings
						title={__('Map Accent Color (Silver)', 'gg-blocks')}
						colorSettings={[
							{
								value: mapAccentColor,
								onChange: (color) => setAttributes({ mapAccentColor: color }),
								label: __('Accent (tints water/parks/highways)', 'gg-blocks'),
							}
						]}
					/>
				)}
			</InspectorControls>

			<div {...blockProps}>
				<div className="contact-text-fields">
					<p className="contact-field address">
						<i className="fa-solid fa-location-dot" aria-hidden="true" style={{ color: iconColor }}></i>
						&nbsp;
						<RichText
							tagName="span"
							value={address}
							onChange={(value) => setAttributes({ address: value })}
							placeholder={__('Street Address, City, State ZIP', 'gg-blocks')}
						/>
					</p>

					<p className="contact-field phone">
						<i className="fa-solid fa-phone" aria-hidden="true" style={{ color: iconColor }}></i>
						&nbsp;
						<RichText
							tagName="span"
							value={phone}
							onChange={(value) => setAttributes({ phone: value })}
							placeholder={__('(555) 123-4567', 'gg-blocks')}
						/>
					</p>

					<p className="contact-field email">
						<i className="fa-solid fa-envelope" aria-hidden="true" style={{ color: iconColor }}></i>
						&nbsp;
						<RichText
							tagName="span"
							value={emailDisplayText}
							onChange={(value) => setAttributes({ emailDisplayText: value })}
							placeholder={__('Email Us', 'gg-blocks')}
						/>
					</p>

					<p className="contact-field hours">
						<i className="fa-solid fa-clock" aria-hidden="true" style={{ color: iconColor }}></i>
						&nbsp;
						<RichText
							tagName="span"
							value={hours}
							onChange={(value) => setAttributes({ hours: value })}
							placeholder={__('Mon–Fri: 9am–5pm', 'gg-blocks')}
						/>
					</p>
				</div>

				{showMap && mapsReady && (
					<div className="contact-map">
						<div
							ref={mapRef}
							style={{ width: '100%', height: 300, borderRadius: '0.5rem' }}
							aria-label={__('Interactive map (editor only)', 'gg-blocks')}
						/>
					</div>
				)}

				{showMap && !mapsReady && fallbackMapSrc && (
					<div className="contact-map">
						<iframe
							title="Map Preview"
							width="100%"
							height="300"
							style={{ border: 0, borderRadius: '0.5rem' }}
							loading="lazy"
							allowFullScreen
							src={fallbackMapSrc}
						/>
					</div>
				)}
			</div>
		</>
	);
}
