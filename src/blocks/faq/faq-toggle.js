document.addEventListener('DOMContentLoaded', () => {
	const faqItems = document.querySelectorAll('.faq .faq-item');

	faqItems.forEach((item) => {
		const button = item.querySelector('.faq-question');
		const answer = item.querySelector('.faq-answer');

		// Ensure the initial open state is respected
		if (!item.classList.contains('open')) {
			answer.style.display = 'none';
		}

		button.addEventListener('click', () => {
			const isOpen = item.classList.contains('open');

			// Close all other open items
			faqItems.forEach((i) => {
				i.classList.remove('open');
				i.querySelector('.faq-answer').style.display = 'none';
				i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
			});

			// Toggle current
			if (!isOpen) {
				item.classList.add('open');
				answer.style.display = 'block';
				button.setAttribute('aria-expanded', 'true');
			}
		});
	});
});
