// save.js
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		items,
		questionFontSize,
		answerFontSize,
		questionTextColor,
		answerTextColor,
		tabBackgroundColor,
		tabBorderColor,
		contentBackgroundColor,
		contentBorderColor,
		blockVertMargin,
		blockPadding,
		contentPadding
	} = attributes;

	return (
		<div
			{...useBlockProps.save({
				className: 'faq-outer-wrapper alignwide',
				style: {
					overflow: 'hidden',
					backgroundColor: tabBackgroundColor,
					margin: `${blockVertMargin} auto`,
					'--faq-tab-color': questionTextColor, 
				}
			})}
		>
			<div className="faq-inner" style={{ padding: blockPadding }}>
				{items.map((item, index) => {
					const isOpen = index === 0; // first open
					return (
						<div
							key={index}
							className={`faq-item${isOpen ? ' open' : ''}`}
							style={{
								backgroundColor: tabBackgroundColor,
								border: `1px solid ${tabBorderColor}`
							}}
						>
							<button
								type="button"
								className="faq-question"
								style={{
									padding: contentPadding,
									backgroundColor: tabBackgroundColor,
									border: '0'
								}}
								aria-expanded={isOpen ? 'true' : 'false'}
							>
								<RichText.Content tagName="span" value={item.question} />
							</button>

							<div
								className="faq-answer"
								style={{
									fontSize: `${answerFontSize}px`,
									color: answerTextColor,
									backgroundColor: contentBackgroundColor,
									padding: contentPadding
								}}
							>
								<RichText.Content tagName="div" value={item.answer} />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
