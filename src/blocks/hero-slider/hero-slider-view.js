// hero-slider-view.js
document.addEventListener('DOMContentLoaded', function () {
    const tracks = document.querySelectorAll('.hero-slider__track');

    tracks.forEach(function (track) {
        const slides = Array.from(track.querySelectorAll('.hero-slider__slide'));
        if (!slides.length) {
            return;
        }

        // If there is only one slide, just show it and do nothing else.
        if (slides.length === 1) {
            slides[0].classList.add('is-active');
            return;
        }

        // Durations (in ms)
        const NORMAL_DURATION = 5000; // ~5 seconds for all slides except last
        const LAST_DURATION   = 1000; // ~5 seconds for the last slide

        let index = 0;
        let timerId = null;

        function showSlide(i) {
            slides.forEach(function (slide, idx) {
                slide.classList.toggle('is-active', idx === i);
            });

            const isLast = (i === slides.length - 1);
            const delay  = isLast ? LAST_DURATION : NORMAL_DURATION;

            clearTimeout(timerId);
            timerId = setTimeout(function () {
                index = (index + 1) % slides.length;
                showSlide(index);
            }, delay);
        }

        // Start the loop
        showSlide(0);
    });
});
