import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const {
        images = [],
        backgroundColor = '#007399',
        gradientStopColor = '#007399',
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'hero-slider alignfull',
        style: {
            '--base-color': backgroundColor,
            '--gradient-stop': gradientStopColor,
        },
        role: 'region',
        'aria-label': 'Hero Slider',
    });

    return (
        <div {...blockProps}>
            <div className="hero-slider__wrapper">
                <div className="hero-slider__media">
                    <div
                        className="hero-slider__overlay"
                        aria-hidden="true"
                    ></div>

                    {images && images.length > 0 && (
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
                    )}
                </div>

                <div className="hero-slider__content">
                    <div className="alignwide">
                        <div className="inner-content">
                            <InnerBlocks.Content />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
