import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { backgroundColor = '#282b35' } = attributes;

	const blockProps = useBlockProps.save({
		className: 'cta-fw alignfull',
		style: { backgroundColor },
		role: 'region',
		'aria-label': 'Full Width CTA',
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
