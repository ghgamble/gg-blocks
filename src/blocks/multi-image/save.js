// save.js
import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
    const { images = [] } = attributes;

    return (
        <div {...useBlockProps.save({ className: 'alignwide multi-img-grid' })}>
            <div className="grid-wrapper">
                {images.map((img, i) => (
                    <figure className="styled-img-wrapper" key={String(img.id ?? `${img.url}-${i}`)} data-touchable>
                        <div className="image-inner">
                            {img.url ? <img src={img.url} alt={img.alt || ''} /> : null}
                        </div>
                    </figure>
                ))}
            </div>
        </div>
    );
}
