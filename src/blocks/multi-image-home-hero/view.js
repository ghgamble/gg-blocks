document.addEventListener('DOMContentLoaded', function () {
	const heroes = document.querySelectorAll('.multi-image-home-hero');

	if (!heroes.length) return;

	const prefersReducedMotion =
		window.matchMedia &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	heroes.forEach(function (hero) {
		const slides = hero.querySelectorAll('.mihh-slide');
		if (!slides.length) return;

		// If only one slide, just show it and stop.
		if (slides.length === 1 || prefersReducedMotion) {
			slides[0].classList.add('is-active');
			return;
		}

		const transitionTimeAttr = hero.getAttribute('data-transition-time');
		const slideDuration = parseInt(transitionTimeAttr, 10) || 5000;

		let index = 0;
		let timerId = null;

		function showSlide(i) {
			slides.forEach(function (slide, idx) {
				slide.classList.toggle('is-active', idx === i);
			});

			clearTimeout(timerId);
			timerId = setTimeout(function () {
				index = (index + 1) % slides.length;
				showSlide(index);
			}, slideDuration);
		}

		// Start with first slide visible
		showSlide(0);
	});
});
