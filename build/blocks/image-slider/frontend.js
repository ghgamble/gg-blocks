/******/ (() => { // webpackBootstrap
/*!*********************************************!*\
  !*** ./src/blocks/image-slider/frontend.js ***!
  \*********************************************/
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.ggb-image-slider');
  sliders.forEach(slider => {
    const track = slider.querySelector('.ggb-image-slider-track');
    const images = track.querySelectorAll('.slider-image-wrapper');
    const slideCount = images.length;
    const slideDuration = parseInt(slider.dataset.transitionTime, 10) || 4000;
    let currentIndex = 0;
    if (slideCount <= 1) return;
    const slide = () => {
      currentIndex = (currentIndex + 1) % slideCount;
      const offset = -100 * currentIndex;
      track.style.transform = `translateX(${offset}%)`;
    };
    track.style.display = 'flex';
    track.style.transition = 'transform 0.5s ease-in-out';
    images.forEach(img => img.style.flex = '0 0 100%');
    setInterval(slide, slideDuration);
  });
});
/******/ })()
;
//# sourceMappingURL=frontend.js.map