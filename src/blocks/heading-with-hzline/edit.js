import {
	useBlockProps,
	InnerBlocks,
	InspectorControls
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
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
		<>
			<InspectorControls>
				<PanelBody title={__('Line Settings', 'acb')}>
					<SelectControl
						label={__('Line Width')}
						value={lineWidth}
						options={[
							{ label: 'Full Width', value: 'full' },
							{ label: 'Half Width', value: 'half' },
						]}
						onChange={(value) => setAttributes({ lineWidth: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Line Spacing', 'acb')} initialOpen={false}>
					<TextControl
						label="Margin Top"
						value={lineMarginTop}
						onChange={(val) => setAttributes({ lineMarginTop: val })}
						placeholder="e.g. 1rem"
					/>
					<TextControl
						label="Margin Bottom"
						value={lineMarginBottom}
						onChange={(val) => setAttributes({ lineMarginBottom: val })}
						placeholder="e.g. 1rem"
					/>
					<TextControl
						label="Padding Top"
						value={linePaddingTop}
						onChange={(val) => setAttributes({ linePaddingTop: val })}
						placeholder="e.g. 0.5rem"
					/>
					<TextControl
						label="Padding Bottom"
						value={linePaddingBottom}
						onChange={(val) => setAttributes({ linePaddingBottom: val })}
						placeholder="e.g. 0.5rem"
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps({ className: `heading-with-hzline ${lineWidth}-width` })}>
				<InnerBlocks
					allowedBlocks={['core/heading']}
					template={[
						['core/heading', { placeholder: 'Add your heading' }]
					]}
				/>
				<div className="horz-line" style={lineStyle} aria-hidden="true"></div>
			</div>
		</>
	);
}
