/******/ (() => { // webpackBootstrap
/*!*******************************************************!*\
  !*** ./src/blocks/testimonials/testimonial-slider.js ***!
  \*******************************************************/
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.testimonial-slider');
  sliders.forEach(slider => {
    const slides = slider.querySelector('.slides');
    const testimonials = slider.querySelectorAll('.testimonial');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    let currentIndex = 0;
    const total = testimonials.length;
    const normalizeIndex = index => (index % total + total) % total;
    const updateDots = () => {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
        dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
      });
    };
    const scrollToIndex = index => {
      const normalizedIndex = normalizeIndex(index);
      const offset = testimonials[normalizedIndex].offsetLeft;
      slides.scrollTo({
        left: offset,
        behavior: 'smooth'
      });
      currentIndex = normalizedIndex;
      updateDots();
    };

    // ⬅️ Previous and ➡️ Next
    prevBtn?.addEventListener('click', () => scrollToIndex(currentIndex - 1));
    nextBtn?.addEventListener('click', () => scrollToIndex(currentIndex + 1));

    // 🔘 Dot navigation
    dots.forEach((dot, i) => {
      dot.setAttribute('role', 'tab');
      dot.setAttribute('tabindex', '0');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => scrollToIndex(i));
      dot.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          scrollToIndex(i);
        }
      });
    });

    // 🧠 Sync scroll to dot updates (for swipe/touch support)
    slides.addEventListener('scroll', () => {
      const scrollLeft = slides.scrollLeft;
      let closestIndex = 0;
      let closestDistance = Infinity;
      testimonials.forEach((slide, i) => {
        const dist = Math.abs(slide.offsetLeft - scrollLeft);
        if (dist < closestDistance) {
          closestIndex = i;
          closestDistance = dist;
        }
      });
      if (closestIndex !== currentIndex) {
        currentIndex = closestIndex;
        updateDots();
      }
    });
    updateDots(); // Initial sync
  });
});
/******/ })()
;
//# sourceMappingURL=testimonial-slider.js.map