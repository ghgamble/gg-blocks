import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import './style.scss';
import GGBIcon from '../../ggb-icon';

// 🔙 Old save() kept here so Gutenberg accepts existing posts with <iframe>
const deprecated = [
	{
		attributes: {
			// Use the attributes that existed when the iframe markup was saved
			address: { type: 'string', source: 'html', selector: '.contact-field.address span', default: '' },
			phone: { type: 'string', source: 'html', selector: '.contact-field.phone span', default: '' },
			emailAddress: { type: 'string', default: '' },
			emailSubject: { type: 'string', default: '' },
			emailDisplayText: { type: 'string', source: 'html', selector: '.contact-field.email span', default: '' },
			hours: { type: 'string', source: 'html', selector: '.contact-field.hours span', default: '' },
			showMap: { type: 'boolean', default: true },
			backgroundColor: { type: 'string', default: '' },
			iconColor: { type: 'string', default: '' },
			lat: { type: 'number', default: null },
			lng: { type: 'number', default: null },
			zoom: { type: 'number', default: 14 },
			mapTypeId: { type: 'string', default: 'roadmap' }
		},
		save({ attributes }) {
			const {
				address, phone, emailAddress, emailSubject, emailDisplayText, hours,
				showMap, backgroundColor, iconColor, lat, lng, zoom
			} = attributes;

			const blockProps = wp.blockEditor.useBlockProps.save({
				className: 'contact-info',
				style: { backgroundColor }
			});

			const safeAddress = (address || '').trim();
			let mapSrc = null;
			if (showMap) {
				if (lat != null && lng != null) {
					const z = Number.isFinite(zoom) ? zoom : 14;
					mapSrc = `https://www.google.com/maps?hl=en&q=@${lat},${lng}&z=${z}&output=embed`;
				} else if (safeAddress) {
					mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(safeAddress)}&output=embed`;
				}
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
								<i className="fa-solid fa-location-dot" aria-hidden="true" style={{ color: iconColor }}></i>&nbsp;
								<span itemProp="streetAddress">{streetAddress}</span>
							</p>
						)}
						{phone && (
							<p className="contact-field phone">
								<i className="fa-solid fa-phone" aria-hidden="true" style={{ color: iconColor }}></i>&nbsp;
								<a href={`tel:${phone.replace(/[^+\d]/g, '')}`} itemProp="telephone">
									<span>{phone}</span>
								</a>
							</p>
						)}
						{emailDisplayText && emailHref && (
							<p className="contact-field email">
								<i className="fa-solid fa-envelope" aria-hidden="true" style={{ color: iconColor }}></i>&nbsp;
								<a href={emailHref} itemProp="email">
									<span>{emailDisplayText}</span>
								</a>
							</p>
						)}
						{hours && (
							<p className="contact-field hours">
								<i className="fa-solid fa-clock" aria-hidden="true" style={{ color: iconColor }}></i>&nbsp;
								<span>{hours}</span>
							</p>
						)}
					</div>

					{mapSrc && (
						<div className="contact-map" itemProp="hasMap">
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
		},
		migrate: (attrs) => attrs
	}
];

registerBlockType(metadata.name, {
	...metadata,
	icon: GGBIcon,
	edit,
	save,        // your new div-based save()
	deprecated   // accepts old iframe markup in existing posts
});
