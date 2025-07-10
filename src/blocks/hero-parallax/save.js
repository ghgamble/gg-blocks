import { useBlockProps, RichText } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

export default function Save({ attributes }) {
	const {
		mediaUrl,
		heading,
		ctaHeadingTop,
		ctaParagraphTop,
		ctaHeadingBottom,
		ctaParagraphBottom,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: 'gg-hero-parallax alignfull',
		style: {
			backgroundImage: mediaUrl ? `url(${mediaUrl})` : 'none',
			backgroundColor: 'black',
		},
	});

	return (
		<>
			<div {...blockProps}>
				<div className="alignwide inner-content">
					<div className="left-header">
						<RichText.Content tagName="h1" value={heading} />
					</div>
					<div className="left-ctas">
						<div className="top-cta">
							<span className="heading">
								<RichText.Content tagName="h3" value={ctaHeadingTop} />
							</span>
							<span className="content">
								<RichText.Content tagName="p" value={ctaParagraphTop} />
							</span>
						</div>
						<div className="bottom-cta">
							<span className="heading">
								<RichText.Content tagName="h3" value={ctaHeadingBottom} />
							</span>
							<span className="content">
								<RichText.Content tagName="p" value={ctaParagraphBottom} />
							</span>
						</div>
					</div>
				</div>
			</div>

			<RawHTML>
				{`
					<script>
                        (function () {
                            const hero = document.querySelector('.gg-hero-parallax');
                            if (!hero) return;

                            hero.style.willChange = 'transform';

                            const updateParallax = () => {
                                const scrollTop = window.scrollY || window.pageYOffset;

                                // Disable parallax on small screens
                                if (window.innerWidth < 768) {
                                    hero.style.transform = 'translateY(0)';
                                    return;
                                }

                                const offset = scrollTop * 0.3;
                                hero.style.transform = 'translateY(' + offset + 'px)';
                            };

                            window.addEventListener('scroll', updateParallax);
                            window.addEventListener('load', updateParallax);
                            updateParallax();
                        })();
					</script>
				`}
			</RawHTML>
		</>
	);
}
