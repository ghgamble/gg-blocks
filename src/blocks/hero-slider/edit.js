import {
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
    InnerBlocks,
    InspectorControls,
} from '@wordpress/block-editor';
import {
    Button,
    PanelBody,
    ColorPalette,
    TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const DEFAULT_COLOR = '#007399';

export default function Edit({ attributes, setAttributes }) {
    const {
        images = [],
        backgroundColor = DEFAULT_COLOR,
        gradientStopColor = DEFAULT_COLOR,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'hero-slider alignfull',
        style: {
            '--base-color': backgroundColor,
            '--gradient-stop': gradientStopColor,
        },
        role: 'region',
        'aria-label': __('Hero Slider', 'gg-blocks'),
    });

    const handleSelectImages = (mediaItems) => {
        if (!mediaItems || !mediaItems.length) {
            setAttributes({ images: [] });
            return;
        }

        const prepared = mediaItems.map((media) => ({
            id: media.id,
            url: media.url,
            alt: media.alt || '',
        }));

        setAttributes({ images: prepared });
    };

    const updateImageAlt = (index, newAlt) => {
        const updated = [...images];

        if (!updated[index]) {
            return;
        }

        updated[index] = { ...updated[index], alt: newAlt };
        setAttributes({ images: updated });
    };

    const removeImage = (index) => {
        const updated = [...images];

        updated.splice(index, 1);
        setAttributes({ images: updated });
    };

    const moveImage = (index, direction) => {
        const newIndex = index + direction;

        if (newIndex < 0 || newIndex >= images.length) {
            return;
        }

        const updated = [...images];
        const temp = updated[index];

        updated[index] = updated[newIndex];
        updated[newIndex] = temp;

        setAttributes({ images: updated });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody
                    title={__('Slider Images', 'gg-blocks')}
                    initialOpen={true}
                >
                    <p>
                        {__(
                            'Upload images for the hero slider. Reorder and edit alt text below.',
                            'gg-blocks'
                        )}
                    </p>

                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={handleSelectImages}
                            allowedTypes={['image']}
                            multiple
                            gallery
                            value={images.map((img) => img.id)}
                            render={({ open }) => (
                                <Button onClick={open} variant="secondary">
                                    {images.length
                                        ? __('Replace Images', 'gg-blocks')
                                        : __('Upload Images', 'gg-blocks')}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                </PanelBody>

                <PanelBody title={__('Colors', 'gg-blocks')} initialOpen={true}>
                    <p>{__('Base Background Color', 'gg-blocks')}</p>
                    <ColorPalette
                        value={backgroundColor}
                        onChange={(color) => setAttributes({ backgroundColor: color })}
                    />
                    <p>{__('Gradient Stop Color', 'gg-blocks')}</p>
                    <ColorPalette
                        value={gradientStopColor}
                        onChange={(color) => setAttributes({ gradientStopColor: color })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="hero-slider__wrapper">
                    <div className="hero-slider__media">
                        <div
                            className="hero-slider__overlay"
                            aria-hidden="true"
                        ></div>

                        {images && images.length > 0 ? (
                            <div className="hero-slider__track">
                                {images.map((img, index) => (
                                    <div
                                        className="hero-slider__slide"
                                        key={img.id || index}
                                    >
                                        <img
                                            src={img.url}
                                            alt={img.alt || ''}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="hero-slider__placeholder">
                                <p>{__('No images selected', 'gg-blocks')}</p>
                            </div>
                        )}
                    </div>

                    <div className="hero-slider__content">
                        <div className="alignwide">
                            <div className="inner-content">
                                <InnerBlocks
                                    allowedBlocks={[
                                        'core/heading',
                                        'core/paragraph'
                                    ]}
                                    template={[
                                        [
                                            'core/heading',
                                            {
                                                placeholder: __(
                                                    'Add hero heading',
                                                    'gg-blocks'
                                                ),
                                            },
                                        ],
                                        [
                                            'core/paragraph',
                                            {
                                                placeholder: __(
                                                    'Add supporting text (optional)',
                                                    'gg-blocks'
                                                ),
                                            },
                                        ]
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {images && images.length > 0 && (
                    <div className="hero-slider__image-list">
                        {images.map((img, index) => (
                            <div
                                className="hero-slider__image-row"
                                key={img.id || index}
                            >
                                <div className="hero-slider__image-thumb">
                                    <img src={img.url} alt="" />
                                </div>
                                <div className="hero-slider__image-fields">
                                    <TextControl
                                        label={__('Alt text', 'gg-blocks')}
                                        value={img.alt || ''}
                                        onChange={(val) => updateImageAlt(index, val)}
                                        help={__(
                                            'Describe this image for screen readers.',
                                            'gg-blocks'
                                        )}
                                    />
                                    <div className="hero-slider__image-actions">
                                        <Button
                                            onClick={() => moveImage(index, -1)}
                                            variant="secondary"
                                            disabled={index === 0}
                                        >
                                            {__('Up', 'gg-blocks')}
                                        </Button>
                                        <Button
                                            onClick={() => moveImage(index, 1)}
                                            variant="secondary"
                                            disabled={index === images.length - 1}
                                        >
                                            {__('Down', 'gg-blocks')}
                                        </Button>
                                        <Button
                                            onClick={() => removeImage(index)}
                                            variant="secondary"
                                            isDestructive
                                        >
                                            {__('Remove', 'gg-blocks')}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
