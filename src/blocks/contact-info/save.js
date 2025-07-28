import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		address,
		phone,
		email,
		hours,
		showMap,
		backgroundColor
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
                    <RichText.Content
                        tagName="p"
                        className="contact-field address"
                        value={address}
                        itemProp="address"
                    />
                )}
                {phone && (
                    <RichText.Content
                        tagName="p"
                        className="contact-field phone"
                        value={phone}
                        itemProp="telephone"
                    />
                )}
                {email && (
                    <RichText.Content
                        tagName="p"
                        className="contact-field email"
                        value={email}
                        itemProp="email"
                    />
                )}
                {hours && (
                    <RichText.Content
                        tagName="p"
                        className="contact-field hours"
                        value={hours}
                    />
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
