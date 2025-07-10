import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
	const {
		mediaUrl,
		heading,
		ctaHeadingTop,
		ctaParagraphTop,
		ctaHeadingBottom,
		ctaParagraphBottom,
	} = attributes;

	const blockProps = useBlockProps({
		className: 'gg-hero-parallax alignfull',
		style: {
			backgroundImage: mediaUrl ? `url(${mediaUrl})` : 'none',
		},
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Hero Settings', 'gg-blocks')} initialOpen={true}>
					<TextControl
						label={__('Heading Text', 'gg-blocks')}
						value={heading}
						onChange={(value) => setAttributes({ heading: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={(media) => setAttributes({ mediaUrl: media.url })}
						allowedTypes={['image']}
						render={({ open }) => (
							<Button onClick={open} variant="primary">
								{mediaUrl ? 'Replace Background Image' : 'Select Background Image'}
							</Button>
						)}
					/>
				</MediaUploadCheck>

				<div className="alignwide inner-content">
					<div className="left-header">
						<RichText
							tagName="h1"
							value={heading}
							onChange={(value) => setAttributes({ heading: value })}
							placeholder={__('Your standout headline here…', 'gg-blocks')}
						/>
					</div>
					<div className="left-ctas">
						<div className="top-cta">
							<span className="heading">
								<RichText
									tagName="h3"
									value={ctaHeadingTop}
									onChange={(value) => setAttributes({ ctaHeadingTop: value })}
									placeholder={__('CTA heading…', 'gg-blocks')}
								/>
							</span>
							<span className="content">
								<RichText
									tagName="p"
									value={ctaParagraphTop}
									onChange={(value) => setAttributes({ ctaParagraphTop: value })}
									placeholder={__('CTA content…', 'gg-blocks')}
								/>
							</span>
						</div>

						<div className="bottom-cta">
							<span className="heading">
								<RichText
									tagName="h3"
									value={ctaHeadingBottom}
									onChange={(value) => setAttributes({ ctaHeadingBottom: value })}
									placeholder={__('CTA heading…', 'gg-blocks')}
								/>
							</span>
							<span className="content">
								<RichText
									tagName="p"
									value={ctaParagraphBottom}
									onChange={(value) => setAttributes({ ctaParagraphBottom: value })}
									placeholder={__('CTA content…', 'gg-blocks')}
								/>
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
