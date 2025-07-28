import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		address,
		phone,
		email,
		hours,
		showMap,
		backgroundColor,
		iconColor
	} = attributes;

	const blockProps = useBlockProps.save({
		className: 'contact-info',
		style: { backgroundColor }
	});

	const encodedAddress = encodeURIComponent(address.trim());
	const mapSrc = showMap && address
		? `https://maps.google.com/maps?q=${encodedAddress}&output=embed`
		: null;

	return (
		<div {...blockProps} itemScope itemType="https://schema.org/LocalBusiness">
			<div className="contact-text-fields">
				{address && (
					<p className="contact-field address">
						<i
							className="fa-solid fa-location-dot"
							aria-hidden="true"
							style={{ color: iconColor }}
						></i>
						&nbsp;
						<RichText.Content tagName="span" value={address} />
					</p>
				)}

				{phone && (
					<p className="contact-field phone">
						<i
							className="fa-solid fa-phone"
							aria-hidden="true"
							style={{ color: iconColor }}
						></i>
						&nbsp;
						<RichText.Content tagName="span" value={phone} />
					</p>
				)}

				{email && (
					<p className="contact-field email">
						<i
							className="fa-solid fa-envelope"
							aria-hidden="true"
							style={{ color: iconColor }}
						></i>
						&nbsp;
						<RichText.Content tagName="span" value={email} />
					</p>
				)}

				{hours && (
					<p className="contact-field hours">
						<i
							className="fa-solid fa-clock"
							aria-hidden="true"
							style={{ color: iconColor }}
						></i>
						&nbsp;
						<RichText.Content tagName="span" value={hours} />
					</p>
				)}
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
	);
}
