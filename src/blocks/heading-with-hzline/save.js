import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		lineWidth = 'full',
		lineMarginTop,
		lineMarginBottom,
		linePaddingTop,
		linePaddingBottom
	} = attributes;

	const lineStyle = {
		marginTop: lineMarginTop || undefined,
		marginBottom: lineMarginBottom || undefined,
		paddingTop: linePaddingTop || undefined,
		paddingBottom: linePaddingBottom || undefined,
	};

	return (
		<div {...useBlockProps.save({ className: `heading-with-hzline ${lineWidth}-width` })}>
			<InnerBlocks.Content />
			<div className="horz-line" style={lineStyle} aria-hidden="true" />
		</div>
	);
}
