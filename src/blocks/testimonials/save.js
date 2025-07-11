import { useBlockProps } from '@wordpress/block-editor';
import starURL from './star.svg';

const Star = ({ filled }) => (
	<img
		src={starURL}
		alt={filled ? 'Filled star' : 'Empty star'}
		className={`star ${filled ? 'filled' : 'outline'}`}
	/>
);

export default function Save({ attributes }) {
	const {
		testimonials,
		navigationColor = '#20ddae',
		hoverColor = '#1bbd97',
		customId = ''
	} = attributes;

	const blockProps = useBlockProps.save({
		className: 'testimonial-slider',
		id: customId || undefined,
		style: {
			'--navigation-color': navigationColor,
			'--hover-color': hoverColor
		}
	});

	return (
		<div {...blockProps}>
			<button className="prev" aria-label="Previous testimonial">‹</button>

			<div className="slides" role="region" aria-label="Testimonials">
				{testimonials.map((item, index) => (
					<div
						className="testimonial"
						key={index}
						role="group"
						aria-roledescription="slide"
						aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
					>
						<div className="stars">
							{[...Array(5)].map((_, i) => (
								<Star key={i} filled={i < item.stars} />
							))}
						</div>
						<blockquote>{item.quote}</blockquote>
						<cite>{item.author}</cite>
					</div>
				))}
			</div>

			<button className="next" aria-label="Next testimonial">›</button>

			<div className="dots" role="tablist" aria-label="Slide navigation">
				{testimonials.map((_, i) => (
					<span
						key={i}
						className="dot"
						role="tab"
						tabIndex="0"
						aria-label={`Go to testimonial ${i + 1}`}
					/>
				))}
			</div>
		</div>
	);
}
