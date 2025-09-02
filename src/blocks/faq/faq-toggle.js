// faq-toggle.js  (viewScript)
if (document.body && document.body.classList.contains('block-editor-page')) {
	// no-op in editor
} else {
	const normalize = () => {
		document.querySelectorAll('.faq-outer-wrapper .faq-inner').forEach(list => {
			const items = Array.from(list.querySelectorAll('.faq-item'));
			items.forEach((item, i) => {
				const btn = item.querySelector('.faq-question');
				if (i === 0) {
					item.classList.add('open');
					if (btn) btn.setAttribute('aria-expanded', 'true');
				} else {
					item.classList.remove('open'); // kills any stray "open" from old saves
					if (btn) btn.setAttribute('aria-expanded', 'false');
				}
			});
		});
	};

	// Run on DOM ready, on load, and after a tick (theme scripts/DOMContentLoaded race-proof)
	document.addEventListener('DOMContentLoaded', () => {
		normalize();
		requestAnimationFrame(normalize);
	});
	window.addEventListener('load', normalize);

	document.addEventListener('click', (e) => {
		const btn = e.target.closest('.faq-question');
		if (!btn) return;

		const item = btn.closest('.faq-item');
		const list = item && item.closest('.faq-inner');
		if (!item || !list) return;

		const wasOpen = item.classList.contains('open');

		// close all in this block
		list.querySelectorAll('.faq-item.open').forEach(openItem => {
			openItem.classList.remove('open');
			const b = openItem.querySelector('.faq-question');
			if (b) b.setAttribute('aria-expanded', 'false');
		});

		// open clicked if it was closed
		if (!wasOpen) {
			item.classList.add('open');
			btn.setAttribute('aria-expanded', 'true');
		}
	});
}
