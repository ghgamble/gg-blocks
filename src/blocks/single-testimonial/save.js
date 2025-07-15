import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { quote, author, quotesColor = '#4a4a4a', dashColor = '#4a4a4a' } = attributes;

    const blockProps = useBlockProps.save({
        className: 'gg-single-testimonial',
        style: {
            '--quotes-color': quotesColor,
            '--dash-color': dashColor
        } 
    });

	return (
	    <div {...blockProps}>
			<div className="alignwide form-testimonial">
                <div className="paragraph-section">
                    <i class="fa-solid fa-quote-left"></i>
                    <RichText.Content tagName="p" className="testimonial-quote" value={quote} />
                    <i class="fa-solid fa-quote-right"></i>
                </div>
                <div className="author-section">
                    <i class="fa-solid fa-minus"></i>
                    <RichText.Content tagName="strong" className="testimonial-author" value={author} />
                </div>
			</div>
		</div>
	);
}
