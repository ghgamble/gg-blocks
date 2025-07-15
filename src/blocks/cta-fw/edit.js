import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, ColorPalette } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const DEFAULT_BG = '#282b35';

export default function Edit({ attributes, setAttributes }) {
	const { backgroundColor = DEFAULT_BG } = attributes;

	const blockProps = useBlockProps({
		className: 'cta-fw alignfull',
		style: { backgroundColor },
		role: 'region',
		'aria-label': __('Full Width CTA', 'gg-blocks'),
	});

	const TEMPLATE = [
		[
			'core/group',
			{
				className: 'two-col-cta-wrapper alignwide',
				layout: { type: 'default' },
			},
			[
				[
					'core/group',
					{
						className: 'two-col-cta-text',
						layout: { type: 'default' },
					},
					[['core/heading', { placeholder: 'Your CTA text here.' }]],
				],
				[
					'core/group',
					{
						className: 'two-col-cta-button',
						layout: { type: 'default' },
					},
					[['core/buttons']],
				],
			],
		],
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Background Color', 'gg-blocks')} initialOpen={true}>
					<ColorPalette
						value={backgroundColor}
						onChange={(color) => setAttributes({ backgroundColor: color })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<InnerBlocks template={TEMPLATE} templateLock={false} />
			</div>
		</>
	);
}
