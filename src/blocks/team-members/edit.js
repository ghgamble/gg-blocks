import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
    const { backgroundColor } = attributes;

    const blockProps = useBlockProps({
        className: 'team-members-grid',
        style: { backgroundColor }
    });

    return (
        <>
            <InspectorControls>
                <PanelColorSettings
                    title={__('Background', 'gg-blocks')}
                    colorSettings={[
                        {
                            label: __('Background Color', 'gg-blocks'),
                            value: backgroundColor,
                            onChange: (color) => setAttributes({ backgroundColor: color })
                        }
                    ]}
                />
            </InspectorControls>
            <div {...blockProps}>
                <InnerBlocks
                    allowedBlocks={['ggb/team-member']}
                    template={[['ggb/team-member']]}
                    renderAppender={InnerBlocks.ButtonBlockAppender}
                />
            </div>
        </>
    );
}
