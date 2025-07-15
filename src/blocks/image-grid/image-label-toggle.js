document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      document.querySelectorAll('[data-touchable]').forEach((figure) => {
        figure.addEventListener('click', () => {
          figure.classList.toggle('touched');
        });
      });
    }
});
  