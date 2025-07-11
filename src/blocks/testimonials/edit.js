import {
	useBlockProps,
	InspectorControls
} from '@wordpress/block-editor';
import {
	Button,
	TextControl,
	TextareaControl,
	RangeControl,
	PanelBody,
	ColorPalette,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		testimonials,
		navigationColor = '#20ddae',
		hoverColor = '#1bbd97',
		customId = ''
	} = attributes;

	const updateTestimonial = (index, field, value) => {
		const updated = [...testimonials];
		updated[index][field] = value;
		setAttributes({ testimonials: updated });
	};

	const addTestimonial = () => {
		setAttributes({
			testimonials: [
				...testimonials,
				{ stars: 5, quote: '', author: '' }
			]
		});
	};

	const removeTestimonial = (index) => {
		const updated = [...testimonials];
		updated.splice(index, 1);
		setAttributes({ testimonials: updated });
	};

	const blockProps = useBlockProps({
		id: customId || undefined,
		style: {
			'--navigation-color': navigationColor,
			'--hover-color': hoverColor
		}
	});

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title="Directional Button Color" initialOpen={true}>
					<ColorPalette
						value={navigationColor}
						onChange={(color) => setAttributes({ navigationColor: color })}
					/>
				</PanelBody>
				<PanelBody title="Hover Color" initialOpen={true}>
					<ColorPalette
						value={hoverColor}
						onChange={(color) => setAttributes({ hoverColor: color })}
					/>
				</PanelBody>
				<PanelBody title="Anchor ID" initialOpen={false}>
					<TextControl
						label="Anchor ID"
						value={customId}
						onChange={(val) => {
							const cleanVal = val.startsWith('#') ? val.slice(1) : val;
							setAttributes({ customId: cleanVal });
						}}
						help="Used for anchor links like /#your-id. Don’t include the # sign."
					/>
				</PanelBody>
			</InspectorControls>

			<h3>Testimonials</h3>
			{testimonials.map((item, index) => (
				<div key={index} className="testimonial-entry" aria-label={`Testimonial ${index + 1}`}>
					<h4>{`Testimonial ${index + 1}`}</h4>
					<RangeControl
						label="Stars"
						value={item.stars}
						onChange={(val) => updateTestimonial(index, 'stars', val)}
						min={1}
						max={5}
					/>
					<TextareaControl
						label="Quote"
						value={item.quote}
						onChange={(val) => updateTestimonial(index, 'quote', val)}
					/>
					<TextControl
						label="Author"
						value={item.author}
						onChange={(val) => updateTestimonial(index, 'author', val)}
					/>
					<Button
						variant="secondary"
						onClick={() => removeTestimonial(index)}
						isDestructive
						aria-label={`Delete testimonial ${index + 1}`}
					>
						Delete
					</Button>
					<hr />
				</div>
			))}
			<Button variant="primary" onClick={addTestimonial}>
				+ Add Testimonial
			</Button>
		</div>
	);
}
