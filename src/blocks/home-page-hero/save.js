import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/* Helpers (mirror edit.js) */
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

	if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color || '')) {
		const rgb = hexToRgb(color);
		if (rgb) return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${o})`;
	}

	const rgbMatch = /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/i.exec(color || '');
	if (rgbMatch) {
		const r = Number(rgbMatch[1]);
		const g = Number(rgbMatch[2]);
		const b = Number(rgbMatch[3]);
		return `rgba(${r}, ${g}, ${b}, ${o})`;
	}

	return `rgba(0,0,0,${o})`;
};

const onlyIf = (v) => (v && v !== '0' ? v : undefined);

export default function save({ attributes }) {
	const {
		mediaUrl,
		mediaType,
		hAlign,
		vAlign,
		contentMaxWidth,
		padding,
		margin,
		overlayColor,
		overlayOpacity,
		contentTextColor,
		heroHeight,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: 'home-page-hero alignfull',
		style: {
			// DO NOT set marginLeft / marginRight inline (breaks alignfull breakout)
			marginTop: onlyIf(margin?.top),
			marginBottom: onlyIf(margin?.bottom),
			height: heroHeight,
		},
	});

	return (
		<div {...blockProps}>
			{mediaUrl && (
				<div className="home-page-hero-preview">
					{mediaType === 'video' ? (
						<video
							src={mediaUrl}
							autoPlay
							loop
							muted
							playsInline
							className="home-page-hero-video"
							aria-hidden="true"
						/>
					) : (
						<img
							src={mediaUrl}
							alt=""
							className="home-page-hero-image"
							aria-hidden="true"
						/>
					)}

					<div
						className="home-page-hero-overlay"
						style={{
							background: computeOverlayBg(overlayColor, overlayOpacity),
							justifyContent:
								hAlign === 'left'
									? 'flex-start'
									: hAlign === 'right'
									? 'flex-end'
									: 'center',
							alignItems:
								vAlign === 'start'
									? 'flex-start'
									: vAlign === 'end'
									? 'flex-end'
									: 'center',
							paddingTop: padding?.top,
							paddingRight: padding?.right,
							paddingBottom: padding?.bottom,
							paddingLeft: padding?.left,
						}}
					>
						<div
							className="home-page-hero-inner"
							style={{
								maxWidth: contentMaxWidth ? `${contentMaxWidth}px` : undefined,
								width: '100%',
								color: contentTextColor,
							}}
						>
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
