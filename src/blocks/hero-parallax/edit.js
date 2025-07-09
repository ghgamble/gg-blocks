import { InspectorControls, InnerBlocks, useBlockProps, MediaUpload } from '@wordpress/block-editor';
import { RichText, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
    const { mediaUrl } = attributes;
    const onSelectMedia = (media) => {
        setAttributes({
            mediaUrl: media?.url || '',
        });
    };

    const blockProps = useBlockProps({
        className: 'gg-hero-parallax alignfull',
        style: {
            backgroundImage: mediaUrl ? `url(${mediaUrl})` : undefined
        }
    });

    return (
        <div {...blockProps}>

        </div>
    );
}

