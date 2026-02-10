import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
	InnerBlocks,
	InspectorControls,
	BlockControls,
	AlignmentControl,
} from '@wordpress/block-editor';
import {
	Button,
	Placeholder,
	PanelBody,
	SelectControl,
	RangeControl,
	ColorPalette,
	BoxControl,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';

/* Helpers (mirroring hero logic) */
const hexToRgb = (hex) => {
	if (!hex) return null;
	let h = hex.replace('#', '').trim();
	if (h.length === 3) h = h.split('').map((c) => c + c).join('');
	if (h.length === 6 || h.length === 8) {
		const r = parseInt(h.slice(0, 2), 16);
		const g = parseInt(h.slice(2, 4), 16);
		const b = parseInt(h.slice(4, 6), 16);
		return { r, g, b };
	}
	return null;
};

const computeOverlayBg = (color, opacity) => {
	if (!color && opacity == null) return undefined;
	const o = typeof opacity === 'number' ? Math.min(Math.max(opacity, 0), 1) : 0.35;

	// Hex → rgba
	if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color || '')) {
		const rgb = hexToRgb(color);
		if (rgb) return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${o})`;
	}

	// rgb/rgba → keep rgb, replace alpha
	const rgbMatch = /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/i.exec(
		color || ''
	);
	if (rgbMatch) {
		const r = Number(rgbMatch[1]);
		const g = Number(rgbMatch[2]);
		const b = Number(rgbMatch[3]);
		return `rgba(${r}, ${g}, ${b}, ${o})`;
	}

	// Fallback
	return `rgba(0,0,0,${o})`;
};

const onlyIf = (v) => (v && v !== '0' ? v : undefined);

export default function Edit({ attributes, setAttributes }) {
	const {
		mediaUrl,
		mediaAlt,
		mediaId,
		hAlign,
		vAlign,
		contentMaxWidth,
		padding,
		margin,
		overlayColor,
		overlayOpacity,
		contentTextColor,
		bannerHeight,
		foldThreshold,
	} = attributes;

	// When an image is selected, pull its alt from the Media Library.
	// If alt is empty there, fall back to alt_text or title.
	const onSelectMedia = (media) => {
		if (!media || !media.url) return;

		setAttributes({
			mediaUrl: media.url,
			mediaId: media.id || 0,
			mediaAlt: media.alt || media.alt_text || media.title || '',
		});
	};

	const blockProps = useBlockProps({
		className: 'folding-page-banner alignfull',
		style: {
			marginTop: onlyIf(margin?.top),
			marginBottom: onlyIf(margin?.bottom),
			height: bannerHeight,
		},
		'data-fold-threshold': foldThreshold,
		role: 'region',
		'aria-label': __('Folding Page Banner', 'gg-blocks'),
	});

	const overlayStyle = useMemo(
		() => ({
			background: computeOverlayBg(overlayColor, overlayOpacity),
			justifyContent:
				hAlign === 'left' ? 'flex-start' : hAlign === 'right' ? 'flex-end' : 'center',
			alignItems:
				vAlign === 'start' ? 'flex-start' : vAlign === 'end' ? 'flex-end' : 'center',
			paddingTop: padding?.top,
			paddingRight: padding?.right,
			paddingBottom: padding?.bottom,
			paddingLeft: padding?.left,
		}),
		[hAlign, vAlign, overlayColor, overlayOpacity, padding]
	);

	const innerStyle = useMemo(
		() => ({
			maxWidth: contentMaxWidth ? `${contentMaxWidth}px` : undefined,
			width: '100%',
			color: contentTextColor,
		}),
		[contentMaxWidth, contentTextColor]
	);

	return (
		<>
			<BlockControls>
				<AlignmentControl
					value={hAlign}
					onChange={(val) => setAttributes({ hAlign: val || 'center' })}
					alignmentControls={[
						{ icon: 'editor-alignleft', title: __('Left'), align: 'left' },
						{ icon: 'editor-aligncenter', title: __('Center'), align: 'center' },
						{ icon: 'editor-alignright', title: __('Right'), align: 'right' },
					]}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Image Accessibility', 'gg-blocks')} initialOpen={!!mediaUrl}>
					<TextControl
						label={__('Alt text (alternative text)', 'gg-blocks')}
						value={mediaAlt}
						onChange={(val) => setAttributes({ mediaAlt: val })}
						help={__('Describe the purpose of the image for screen readers.', 'gg-blocks')}
					/>
				</PanelBody>

				<PanelBody title={__('Layout', 'gg-blocks')} initialOpen>
					<SelectControl
						label={__('Vertical Align', 'gg-blocks')}
						value={vAlign}
						options={[
							{ label: __('Top', 'gg-blocks'), value: 'start' },
							{ label: __('Center', 'gg-blocks'), value: 'center' },
							{ label: __('Bottom', 'gg-blocks'), value: 'end' },
						]}
						onChange={(value) => setAttributes({ vAlign: value })}
					/>
					<RangeControl
						label={__('Content Max Width (px)', 'gg-blocks')}
						value={contentMaxWidth}
						onChange={(value) => setAttributes({ contentMaxWidth: value })}
						min={600}
						max={1400}
						step={10}
					/>
					<BoxControl
						label={__('Padding', 'gg-blocks')}
						values={padding}
						onChange={(next) => setAttributes({ padding: next })}
						allowReset
					/>
					<BoxControl
						label={__('Outer Margin (top/bottom)', 'gg-blocks')}
						values={{ top: margin?.top, bottom: margin?.bottom }}
						onChange={(next) =>
							setAttributes({
								margin: {
									top: next?.top ?? margin?.top ?? '0',
									right: margin?.right ?? '0',
									bottom: next?.bottom ?? margin?.bottom ?? '0',
									left: margin?.left ?? '0',
								},
							})
						}
						allowReset
					/>
					<RangeControl
						label={__('Banner Height (vh)', 'gg-blocks')}
						value={parseInt(bannerHeight)}
						onChange={(val) => setAttributes({ bannerHeight: `${val}vh` })}
						min={25}
						max={100}
						step={1}
					/>
					<RangeControl
						label={__('Fold Threshold (px)', 'gg-blocks')}
						value={foldThreshold}
						onChange={(val) => setAttributes({ foldThreshold: val })}
						min={0}
						max={600}
						step={10}
					/>
				</PanelBody>

				<PanelBody title={__('Colors', 'gg-blocks')} initialOpen={false}>
					<p style={{ marginBottom: 8 }}>{__('Overlay Color', 'gg-blocks')}</p>
					<ColorPalette
						value={overlayColor}
						onChange={(value) => setAttributes({ overlayColor: value })}
					/>
					<RangeControl
						label={__('Overlay Opacity', 'gg-blocks')}
						value={overlayOpacity}
						onChange={(value) => setAttributes({ overlayOpacity: value })}
						min={0}
						max={1}
						step={0.05}
					/>
					<p style={{ marginTop: 16, marginBottom: 8 }}>
						{__('Content Text Color', 'gg-blocks')}
					</p>
					<ColorPalette
						value={contentTextColor}
						onChange={(value) => setAttributes({ contentTextColor: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div className="folding-page-banner-wrap">
				<div {...blockProps}>
					<MediaUploadCheck>
						<MediaUpload
							allowedTypes={['image']}
							onSelect={onSelectMedia}
							render={({ open }) => (
								<>
									{!mediaUrl ? (
										<Placeholder
											label={__('Folding Page Banner Image', 'gg-blocks')}
											instructions={__(
												'Upload an image to display as the page banner background.',
												'gg-blocks'
											)}
										>
											<Button variant="primary" onClick={open}>
												{__('Upload Image', 'gg-blocks')}
											</Button>
										</Placeholder>
									) : (
										<div className="folding-page-banner-preview">
											<img
												src={mediaUrl}
												alt={mediaAlt || ''}
												className="folding-page-banner-image"
												aria-hidden={mediaAlt ? 'false' : 'true'}
											/>

											<div
												className="folding-page-banner-overlay"
												style={overlayStyle}
											>
												<div
													className="folding-page-banner-inner"
													style={innerStyle}
												>
													<InnerBlocks templateLock={false} />
												</div>
											</div>

											<div className="folding-page-banner-media-actions">
												<Button variant="secondary" onClick={open}>
													{__('Replace Image', 'gg-blocks')}
												</Button>
											</div>
										</div>
									)}
								</>
							)}
						/>
					</MediaUploadCheck>
				</div>
			</div>
		</>
	);
}
