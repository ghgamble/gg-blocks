/******/ (() => { // webpackBootstrap
/*!*****************************************************!*\
  !*** ./src/blocks/image-grid/image-label-toggle.js ***!
  \*****************************************************/
document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    document.querySelectorAll('[data-touchable]').forEach(figure => {
      figure.addEventListener('click', () => {
        figure.classList.toggle('touched');
      });
    });
  }
});
/******/ })()
;
//# sourceMappingURL=image-label-toggle.js.map