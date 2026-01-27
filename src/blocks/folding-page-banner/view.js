document.addEventListener('DOMContentLoaded', function () {
	const wraps = document.querySelectorAll('.folding-page-banner-wrap');

	if (!wraps.length) return;

	const prefersReducedMotion =
		window.matchMedia &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (prefersReducedMotion) return;

	let ticking = false;

	function update() {
		ticking = false;

		wraps.forEach((wrap) => {
			const rect = wrap.getBoundingClientRect();
			const height = rect.height || wrap.offsetHeight || window.innerHeight;

			// How far the wrapper has scrolled past the top of the viewport
			const distancePastTop = -rect.top;

			/* ================================
			   HARD HIDE WHEN FULLY SCROLLED
			================================ */
			if (distancePastTop >= height) {
				wrap.classList.add('is-hidden');
				return;
			} else {
				wrap.classList.remove('is-hidden');
			}

			/* ================================
			   FADE + MOVE INNER BANNER
			================================ */
			const inner = wrap.querySelector('.folding-page-banner');
			if (!inner) return;

			const clampedDistance = Math.max(0, distancePastTop);

			let progress = height > 0 ? clampedDistance / height : 0;
			if (progress < 0) progress = 0;
			if (progress > 1) progress = 1;

			const rem = parseFloat(
				getComputedStyle(document.documentElement).fontSize
			);
			const maxTranslate = rem * 3;
			const translateY = -progress * maxTranslate;

			const minOpacity = 0.1;
			const opacity = 1 - (1 - minOpacity) * progress;

			inner.style.transform = `translateY(${translateY}px)`;
			inner.style.opacity = String(opacity);
		});
	}

	function onScroll() {
		if (ticking) return;
		ticking = true;
		window.requestAnimationFrame(update);
	}

	// Initial state (in case you reload mid-page)
	update();

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', update);
});
