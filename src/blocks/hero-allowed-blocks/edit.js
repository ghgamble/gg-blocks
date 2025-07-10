import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
	const { mediaUrl } = attributes;

	const blockProps = useBlockProps({
		className: 'gg-hero-allowed-blocks alignfull',
		style: {
			backgroundImage: mediaUrl ? `url(${mediaUrl})` : 'none',
		},
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Hero Settings', 'gg-blocks')} initialOpen={true}>
					{/* other settings here */}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={(media) => setAttributes({ mediaUrl: media.url })}
						allowedTypes={['image']}
						render={({ open }) => (
							<Button onClick={open} variant="primary">
								{mediaUrl ? 'Replace Background Image' : 'Select Background Image'}
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
									['core/heading', { placeholder: 'Your standout headline here…' }],
								],
							],
							[
								'core/group',
								{ className: 'left-ctas' },
								[
									['core/heading', { placeholder: 'The problem' }],
									['core/paragraph', { placeholder: 'Describe the problem…' }],
									['core/heading', { placeholder: 'The solution' }],
									['core/paragraph', { placeholder: 'Describe the solution…' }],
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
