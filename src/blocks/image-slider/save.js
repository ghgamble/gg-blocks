import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { images, slideDuration, layout } = attributes;

	const blockProps = useBlockProps.save({
		className: `ggb-image-slider ${layout}`,
		'data-transition-time': slideDuration,
	});

	return (
		<div {...blockProps}>
			<div className="ggb-image-slider-track">
			{images.map((img, index) => (
				img?.url ? (
					<div key={index} className="slider-image-wrapper">
						<img src={img.url} alt={img.alt || ''} />
					</div>
				) : null
			))}
			</div>
		</div>
	);
}