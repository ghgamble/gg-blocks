import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPalette } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const DEFAULT_COLOR = '#4a4a4a';

export default function Edit({ attributes, setAttributes }) {
	const { quote, author, quotesColor = DEFAULT_COLOR, dashColor = DEFAULT_COLOR } = attributes;

	const blockProps = useBlockProps({ 
        className: 'gg-single-testimonial',
        style: {
            '--quotes-color': quotesColor,
            '--dash-color': dashColor
        } 
    });

	return (
        <>
            <InspectorControls>
                <PanelBody title="Colors" initialOpen={true}>
                    <ColorPalette
                        label="Quotes Color"
                        value={quotesColor}
                        onChange={(color) => setAttributes({quotesColor: color})}
                    />
                    <ColorPalette 
                        label="Author Dash Color"
                        value={dashColor}
                        onChange={(color) => setAttributes({dashColor: color})}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <div className="alignwide form-testimonial">
                    <RichText
                        tagName="p"
                        className="testimonial-quote"
                        value={quote}
                        onChange={(value) => setAttributes({ quote: value })}
                        placeholder={__('Add testimonial text…', 'gg-blocks')}
                        allowedFormats={[]}
                    />
                    <RichText
                        tagName="strong"
                        className="testimonial-author"
                        value={author}
                        onChange={(value) => setAttributes({ author: value })}
                        placeholder={__('– Author name', 'gg-blocks')}
                        allowedFormats={[]}
                    />
                </div>
            </div>        
        </>
	);
}
