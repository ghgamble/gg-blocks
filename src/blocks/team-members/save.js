import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { backgroundColor } = attributes;

    return (
        <div {...useBlockProps.save({
            className: 'team-members-grid',
            style: { backgroundColor }
        })}>
            <InnerBlocks.Content />
        </div>
    );
}
