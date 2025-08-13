import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
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

	const blockProps = useBlockProps.save({
		className: 'contact-info',
		style: { backgroundColor }
	});

	const safeAddress = (address || '').trim();

	// iframe fallback only when coords missing
	let mapSrc = null;
	if (showMap && (lat == null || lng == null) && safeAddress) {
		const encodedAddress = encodeURIComponent(safeAddress);
		mapSrc = `https://maps.google.com/maps?q=${encodedAddress}&output=embed`;
	}

	const emailHref = emailAddress
		? `mailto:${emailAddress}${emailSubject ? `?subject=${encodeURIComponent(emailSubject)}` : ''}`
		: null;

	const streetAddress = safeAddress ? safeAddress.split(',')[0] : '';

	return (
		<div {...blockProps} itemScope itemType="https://schema.org/LocalBusiness">
			<div className="contact-text-fields">
				{streetAddress && (
					<p className="contact-field address" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
						<i className="fa-solid fa-location-dot" aria-hidden="true" style={{ color: iconColor }}></i>
						&nbsp;
						<span itemProp="streetAddress">{streetAddress}</span>
					</p>
				)}

				{phone && (
					<p className="contact-field phone">
						<i className="fa-solid fa-phone" aria-hidden="true" style={{ color: iconColor }}></i>
						&nbsp;
						<a href={`tel:${phone.replace(/[^+\d]/g, '')}`} itemProp="telephone">
							<RichText.Content tagName="span" value={phone} />
						</a>
					</p>
				)}

				{emailDisplayText && emailHref && (
					<p className="contact-field email">
						<i className="fa-solid fa-envelope" aria-hidden="true" style={{ color: iconColor }}></i>
						&nbsp;
						<a href={emailHref} itemProp="email">
							<RichText.Content tagName="span" value={emailDisplayText} />
						</a>
					</p>
				)}

				{hours && (
					<p className="contact-field hours">
						<i className="fa-solid fa-clock" aria-hidden="true" style={{ color: iconColor }}></i>
						&nbsp;
						<RichText.Content tagName="span" value={hours} />
					</p>
				)}
			</div>

			{showMap && (
				<div className="contact-map" itemProp="hasMap">
					{lat != null && lng != null ? (
						<div
							className="ggb-map"
							data-lat={lat}
							data-lng={lng}
							data-zoom={Number.isFinite(zoom) ? zoom : 14}
							data-type={mapTypeId || 'roadmap'}
							data-accent={mapAccentColor || '#2c944b'}
							style={{ width: '100%', height: '300px', borderRadius: '0.5rem' }}
						/>
					) : (
						mapSrc && (
							<iframe
								title="Map"
								width="100%"
								height="300"
								style={{ border: 0, borderRadius: '0.5rem' }}
								loading="lazy"
								allowFullScreen
								src={mapSrc}
							/>
						)
					)}
				</div>
			)}
		</div>
	);
}
