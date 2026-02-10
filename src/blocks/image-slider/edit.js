import { __ } from '@wordpress/i18n';
import {
	MediaUpload,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	Button,
	TextControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { images = [], slideDuration } = attributes;

	const blockProps = useBlockProps({
		className: 'ggb-image-slider',
	});

	const handleSelectImages = (imgs) => {
		if (!imgs || !imgs.length) {
			setAttributes({ images: [] });
			return;
		}

		const prepared = imgs.map((img) => ({
			id: img.id || img.url,
			url: img.url,
			alt: img.alt || img.alt_text || img.title || '',
		}));

		setAttributes({ images: prepared });
	};

	const updateImageAlt = (index, newAlt) => {
		const updated = [...images];
		if (!updated[index]) return;

		updated[index] = {
			...updated[index],
			alt: newAlt,
		};

		setAttributes({ images: updated });
	};

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

				{images.length > 0 && (
					<PanelBody
						title={__('Image Alt Text', 'gg-blocks')}
						initialOpen={false}
					>
						{images.map((img, index) => (
							<TextControl
								key={img.id || `alt-${index}`}
								label={__('Alt text', 'gg-blocks')}								
								value={img.alt || ''}
								onChange={(val) => updateImageAlt(index, val)}
								help={__(
									'Describe the image for screen readers. Leave empty if decorative.',
									'gg-blocks'
								)}
							/>
						))}
					</PanelBody>
				)}
			</InspectorControls>

			<div {...blockProps} data-transition-time={slideDuration}>
				<div className="ggb-image-slider-track">
					{images.map((img, index) =>
						img?.url ? (
							<div key={img.id || index} className="slider-image-wrapper">
								<img
									src={img.url}
									alt={img.alt || ''}
									aria-hidden={img.alt ? 'false' : 'true'}
								/>
							</div>
						) : null
					)}
				</div>

				<MediaUpload
					onSelect={handleSelectImages}
					allowedTypes={['image']}
					multiple
					gallery
					value={images.map((img) => img.id).filter(Boolean)}
					render={({ open }) => (
						<Button
							variant="secondary"
							onClick={open}
							className="upload-button"
						>
							{images.length > 0
								? __('Edit Images', 'gg-blocks')
								: __('Upload Images', 'gg-blocks')}
						</Button>
					)}
				/>
			</div>
		</>
	);
}
