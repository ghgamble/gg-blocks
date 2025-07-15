import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const {
		images,
		labelBackgroundColor = '#34d399',
		overlayBackgroundColor = 'rgba(25, 91, 136, 0.6)'
	} = attributes;

	return (
		<div {...useBlockProps.save({ className: 'alignwide styled-img-grid' })}>
			<div className="grid-wrapper">
				{images.map((img) => (
					<figure className="styled-img-wrapper" key={img.url} data-touchable>
						<div className="image-inner">
							{img.link ? (
								<a href={img.link}>
									<img src={img.url} alt="" />
									{img.label && (
										<figcaption
											className="img-overlay"
											style={{ backgroundColor: overlayBackgroundColor }}
										>
											<span
												className="img-label"
												style={{ backgroundColor: labelBackgroundColor }}
											>
												{img.label}
											</span>
										</figcaption>
									)}
								</a>
							) : (
								<>
									<img src={img.url} alt="" />
									{img.label && (
										<figcaption
											className="img-overlay"
											style={{ backgroundColor: overlayBackgroundColor }}
										>
											<span
												className="img-label"
												style={{ backgroundColor: labelBackgroundColor }}
											>
												{img.label}
											</span>
										</figcaption>
									)}
								</>
							)}
						</div>
					</figure>
				))}
			</div>
		</div>
	);
}
