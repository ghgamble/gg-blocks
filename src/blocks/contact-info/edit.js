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
		backgroundColor
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
			</InspectorControls>

			<div {...blockProps}>
                <div className="contact-text-fields">
                    <RichText
                        tagName="p"
                        className="contact-field address"
                        value={address}
                        onChange={(value) => setAttributes({ address: value })}
                        placeholder={__('123 Main St, Longmont, CO', 'gg-blocks')}
                    />
                    <RichText
                        tagName="p"
                        className="contact-field phone"
                        value={phone}
                        onChange={(value) => setAttributes({ phone: value })}
                        placeholder={__('(555) 123-4567', 'gg-blocks')}
                    />
                    <RichText
                        tagName="p"
                        className="contact-field email"
                        value={email}
                        onChange={(value) => setAttributes({ email: value })}
                        placeholder={__('info@yourdomain.com', 'gg-blocks')}
                    />
                    <RichText
                        tagName="p"
                        className="contact-field hours"
                        value={hours}
                        onChange={(value) => setAttributes({ hours: value })}
                        placeholder={__('Mon–Fri: 9am–5pm', 'gg-blocks')}
                    />
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
