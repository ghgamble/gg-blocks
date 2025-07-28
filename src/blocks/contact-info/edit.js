import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	PanelColorSettings
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		address,
		phone,
		email,
		hours,
		showMap,
		backgroundColor,
		iconColor
	} = attributes;

	const blockProps = useBlockProps({
		className: 'contact-info',
		style: { backgroundColor }
	});

	const encodedAddress = encodeURIComponent(address.trim());
	const mapSrc = showMap && address
		? `https://maps.google.com/maps?q=${encodedAddress}&output=embed`
		: null;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'gg-blocks')} initialOpen={true}>
					<ToggleControl
						label={__('Show Map', 'gg-blocks')}
						checked={showMap}
						onChange={(value) => setAttributes({ showMap: value })}
					/>
				</PanelBody>

				<PanelColorSettings
					title={__('Background Color', 'gg-blocks')}
					initialOpen={false}
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
					initialOpen={false}
					colorSettings={[
						{
							value: iconColor,
							onChange: (color) => setAttributes({ iconColor: color }),
							label: __('Contact Info Icon Color', 'gg-blocks'),
						}
					]}
				/>
			</InspectorControls>

			<div {...blockProps}>
				<div className="contact-text-fields">
					<p className="contact-field address">
						<i
							className="fa-solid fa-location-dot"
							aria-hidden="true"
							style={{ color: iconColor }}
						></i>
						&nbsp;
						<RichText
							tagName="span"
							value={address}
							onChange={(value) => setAttributes({ address: value })}
							placeholder={__('123 Main St, Longmont, CO', 'gg-blocks')}
						/>
					</p>

					<p className="contact-field phone">
						<i
							className="fa-solid fa-phone"
							aria-hidden="true"
							style={{ color: iconColor }}
						></i>
						&nbsp;
						<RichText
							tagName="span"
							value={phone}
							onChange={(value) => setAttributes({ phone: value })}
							placeholder={__('(555) 123-4567', 'gg-blocks')}
						/>
					</p>

					<p className="contact-field email">
						<i
							className="fa-solid fa-envelope"
							aria-hidden="true"
							style={{ color: iconColor }}
						></i>
						&nbsp;
						<RichText
							tagName="span"
							value={email}
							onChange={(value) => setAttributes({ email: value })}
							placeholder={__('info@yourdomain.com', 'gg-blocks')}
						/>
					</p>

					<p className="contact-field hours">
						<i
							className="fa-solid fa-clock"
							aria-hidden="true"
							style={{ color: iconColor }}
						></i>
						&nbsp;
						<RichText
							tagName="span"
							value={hours}
							onChange={(value) => setAttributes({ hours: value })}
							placeholder={__('Mon–Fri: 9am–5pm', 'gg-blocks')}
						/>
					</p>
				</div>

				{mapSrc && (
					<div className="contact-map">
						<iframe
							title="Map"
							width="100%"
							height="300"
							style={{ border: 0, borderRadius: '0.5rem' }}
							loading="lazy"
							allowFullScreen
							src={mapSrc}
						></iframe>
					</div>
				)}
			</div>
		</>
	);
}
