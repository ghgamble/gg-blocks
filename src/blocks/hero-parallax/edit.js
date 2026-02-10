import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
	const { mediaUrl, mediaAlt, mediaId } = attributes;

	const blockProps = useBlockProps({
		className: 'gg-hero-parallax alignfull',
		style: {
			backgroundImage: mediaUrl ? `url(${mediaUrl})` : 'none',
		},
	});

	const onSelectMedia = (media) => {
		if (!media || !media.url) return;

		setAttributes({
			mediaUrl: media.url,
			mediaType: media.media_type || 'image',
			mediaId: media.id || 0,
			// Pull from media library alt; fall back safely
			mediaAlt: media.alt || media.alt_text || media.title || '',
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Hero Settings', 'gg-blocks')} initialOpen={true}>
					{/* other settings here */}
				</PanelBody>

				<PanelBody
					title={__('Image Accessibility', 'gg-blocks')}
					initialOpen={!!mediaUrl}
				>
					<TextControl
						label={__('Alt text (alternative text)', 'gg-blocks')}
						value={mediaAlt}
						onChange={(val) => setAttributes({ mediaAlt: val })}
						help={__(
							'Describe the purpose of the background image if it conveys information beyond the visible text. Leave blank if it is decorative.',
							'gg-blocks'
						)}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={onSelectMedia}
						allowedTypes={['image']}
						render={({ open }) => (
							<Button onClick={open} variant="primary">
								{mediaUrl
									? __('Replace Background Image', 'gg-blocks')
									: __('Select Background Image', 'gg-blocks')}
							</Button>
						)}
					/>
				</MediaUploadCheck>

				<div className="alignwide inner-content">
					<InnerBlocks
						allowedBlocks={['core/group']}
						template={[
							[
								'core/group',
								{ className: 'left-header' },
								[
									[
										'core/heading',
										{
											placeholder: __('Your standout headline here…', 'gg-blocks'),
										},
									],
								],
							],
							[
								'core/group',
								{ className: 'left-ctas' },
								[
									[
										'core/heading',
										{ placeholder: __('CTA one', 'gg-blocks') },
									],
									[
										'core/paragraph',
										{ placeholder: __('CTA one description…', 'gg-blocks') },
									],
									[
										'core/heading',
										{ placeholder: __('CTA two', 'gg-blocks') },
									],
									[
										'core/paragraph',
										{ placeholder: __('CTA two description…', 'gg-blocks') },
									],
								],
							],
						]}
						templateLock={false}
					/>
				</div>
			</div>
		</>
	);
}
