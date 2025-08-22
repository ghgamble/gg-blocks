import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	PanelColorSettings
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	TextControl,
	RangeControl
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
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

	const outerProps = useBlockProps({
		className: 'faq-outer-wrapper alignwide',
		style: {
			overflow: 'hidden',
			backgroundColor: tabBackgroundColor,
			margin: `${blockVertMargin} auto`
		}
	});

	const updateItem = (index, key, value) => {
		const updatedItems = [...items];
		updatedItems[index][key] = value;
		setAttributes({ items: updatedItems });
	};

	const addItem = () => {
		const newItems = [...items, { question: '', answer: '' }];
		setAttributes({ items: newItems });
	};

	const removeItem = (index) => {
		const newItems = [...items];
		newItems.splice(index, 1);
		setAttributes({ items: newItems });
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Text Settings', 'gg-blocks')} initialOpen={true}>
					<RangeControl
						label={__('Question Font Size', 'gg-blocks')}
						value={questionFontSize}
						onChange={(value) => setAttributes({ questionFontSize: value })}
						min={12}
						max={36}
					/>
					<RangeControl
						label={__('Answer Font Size', 'gg-blocks')}
						value={answerFontSize}
						onChange={(value) => setAttributes({ answerFontSize: value })}
						min={12}
						max={36}
					/>
				</PanelBody>

				<PanelColorSettings
					title={__('Colors', 'gg-blocks')}
					colorSettings={[
						{
							value: questionTextColor,
							onChange: (value) => setAttributes({ questionTextColor: value }),
							label: __('Question Text Color', 'gg-blocks')
						},
						{
							value: answerTextColor,
							onChange: (value) => setAttributes({ answerTextColor: value }),
							label: __('Answer Text Color', 'gg-blocks')
						},
						{
							value: tabBackgroundColor,
							onChange: (value) => setAttributes({ tabBackgroundColor: value }),
							label: __('Tab Background Color', 'gg-blocks')
						},
						{
							value: tabBorderColor,
							onChange: (value) => setAttributes({ tabBorderColor: value }),
							label: __('Tab Border Color', 'gg-blocks')
						},
						{
							value: contentBackgroundColor,
							onChange: (value) => setAttributes({ contentBackgroundColor: value }),
							label: __('Answer Background Color', 'gg-blocks')
						},
						{
							value: contentBorderColor,
							onChange: (value) => setAttributes({ contentBorderColor: value }),
							label: __('Answer Border Color', 'gg-blocks')
						}
					]}
				/>

				<PanelBody title={__('Layout', 'gg-blocks')} initialOpen={false}>
					<TextControl
						label={__('Block Padding (e.g., 2rem)', 'gg-blocks')}
						value={blockPadding}
						onChange={(value) => setAttributes({ blockPadding: value })}
					/>
					<TextControl
						label={__('Content Padding (e.g., 1rem)', 'gg-blocks')}
						value={contentPadding}
						onChange={(value) => setAttributes({ contentPadding: value })}
					/>
                    <TextControl
						label={__('Block Top and Bottom Spacing (e.g., 2rem)', 'gg-blocks')}
						value={blockVertMargin}
						onChange={(value) => setAttributes({ blockVertMargin: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...outerProps}>
				<div className="faq-inner" style={{ padding: blockPadding }}>
					{items.map((item, index) => (
						<div
							key={index}
							className={`faq-item ${index === 0 ? 'open' : ''}`}
							style={{
								backgroundColor: tabBackgroundColor,
								border: `1px solid ${tabBorderColor}`
							}}
						>
							<RichText
								tagName="button"
								className="faq-question"
								value={item.question}
								onChange={(value) => updateItem(index, 'question', value)}
								placeholder={__('Question', 'gg-blocks')}
								style={{
									fontSize: `${questionFontSize}px`,
									color: questionTextColor,
									padding: contentPadding,
									backgroundColor: tabBackgroundColor,
									border: contentBackgroundColor
								}}
							/>

							<RichText
								tagName="div"
								className="faq-answer"
								value={item.answer}
								onChange={(value) => updateItem(index, 'answer', value)}
								placeholder={__('Answer', 'gg-blocks')}
								style={{
									fontSize: `${answerFontSize}px`,
									color: answerTextColor,
									backgroundColor: contentBackgroundColor,
									padding: contentPadding
								}}
							/>

							<Button
								variant="link"
								onClick={() => removeItem(index)}
								style={{ marginTop: '0.5rem' }}
							>
								{__('Remove', 'gg-blocks')}
							</Button>
						</div>
					))}

					<Button
						variant="secondary"
						onClick={addItem}
						style={{ marginTop: '1rem' }}
					>
						{__('Add FAQ', 'gg-blocks')}
					</Button>
				</div>
			</div>
		</Fragment>
	);
}
