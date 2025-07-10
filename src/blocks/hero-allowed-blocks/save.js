import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

export default function save({ attributes }) {
	const blockProps = useBlockProps.save({
		className: 'gg-hero-allowed-blocks alignfull',
		style: {
			backgroundImage: attributes.mediaUrl ? `url(${attributes.mediaUrl})` : 'none',
		},
	});

	return (
        <>
            <div {...blockProps}>
                <div className="alignwide inner-content">
                    <InnerBlocks.Content />
                </div>
            </div>
            <RawHTML>
				{`
					<script>
                        (function () {
                            const hero = document.querySelector('.gg-hero-allowed-blocks');
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
