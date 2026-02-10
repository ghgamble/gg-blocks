import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

export default function save({ attributes }) {
	const blockProps = useBlockProps.save({
		className: 'gg-hero-parallax alignfull',
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
	// Respect prefers-reduced-motion
	if (
		window.matchMedia &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	) {
		return;
	}

	const heroes = Array.prototype.slice.call(
		document.querySelectorAll('.gg-hero-parallax .inner-content')
	);

	if (!heroes.length) return;

	heroes.forEach(function (hero) {
		hero.style.willChange = 'transform';
	});

	function updateParallax() {
		var scrollTop = window.scrollY || window.pageYOffset;

		heroes.forEach(function (hero) {
			// Disable parallax on small screens
			if (window.innerWidth < 768) {
				hero.style.transform = 'translateY(0)';
				return;
			}

			var offset = scrollTop * 0.3;
			hero.style.transform = 'translateY(' + offset + 'px)';
		});
	}

	window.addEventListener('scroll', updateParallax, { passive: true });
	window.addEventListener('load', updateParallax);
	updateParallax();
})();
</script>
				`}
			</RawHTML>
		</>
	);
}
