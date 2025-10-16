import { __ } from '@wordpress/i18n';
import { MediaUpload, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RangeControl, Button, SelectControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const { images, slideDuration } = attributes;

	const blockProps = useBlockProps({
		className: 'ggb-image-slider',
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Slider Settings', 'gg-blocks')}>
					<RangeControl
						label={__('Slide Duration (ms)', 'gg-blocks')}
						value={slideDuration}
						onChange={(value) => setAttributes({ slideDuration: value })}
						min={1000}
						max={10000}
						step={500}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps} data-transition-time={slideDuration}>
				<div className="ggb-image-slider-track">
				{images.map((img, index) => (
					img?.url ? (
						<div key={index} className="slider-image-wrapper">
							<img src={img.url} alt={img.alt || ''} />
						</div>
					) : null
				))}
				</div>
				<MediaUpload
					onSelect={(imgs) =>
						setAttributes({
							images: imgs.map((img) => ({
								url: img.url,
								alt: img.alt,
							})),
						})
					}
					allowedTypes={['image']}
					multiple
					gallery
					value={images.map((img) => img.id)}
					render={({ open }) => (
						<Button variant="secondary" onClick={open} className="upload-button">
							{images.length > 0 ? __('Edit Images', 'gg-blocks') : __('Upload Images', 'gg-blocks')}
						</Button>
					)}
				/>
			</div>
		</>
	);
}