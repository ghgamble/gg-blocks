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
	RangeControl,
	ColorPalette,
	BoxControl,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';

/* Helpers (same pattern as homepage hero) */
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
	const o =
		typeof opacity === 'number'
			? Math.min(Math.max(opacity, 0), 1)
			: 0.35;

	// Hex → rgba
	if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color || '')) {
		const rgb = hexToRgb(color);
		if (rgb) return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${o})`;
	}

	// rgb/rgba → keep rgb, replace alpha
	const rgbMatch =
		/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/i.exec(
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

export default function Edit( { attributes, setAttributes } ) {
	const {
		images = [],
		hAlign,
		vAlign,
		contentMaxWidth,
		padding,
		margin,
		overlayColor,
		overlayOpacity,
		contentTextColor,
		heroHeight,
		slideDuration,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'multi-image-home-hero alignfull',
		style: {
			marginTop: onlyIf(margin?.top),
			marginBottom: onlyIf(margin?.bottom),
			height: heroHeight,
		},
		'data-transition-time': slideDuration,
		role: 'region',
		'aria-label': __( 'Multi Image Home Hero', 'gg-blocks' ),
	} );

	const overlayStyle = useMemo(
		() => ( {
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
		} ),
		[ hAlign, vAlign, overlayColor, overlayOpacity, padding ]
	);

	const innerStyle = useMemo(
		() => ( {
			maxWidth: contentMaxWidth ? `${ contentMaxWidth }px` : undefined,
			width: '100%',
			color: contentTextColor,
		} ),
		[ contentMaxWidth, contentTextColor ]
	);

	const handleSelectImages = (mediaItems) => {
		if (!mediaItems || !mediaItems.length) {
			setAttributes( { images: [] } );
			return;
		}

		const prepared = mediaItems.map( (media) => ( {
			id: media.id ?? media.url,
			url: media.url,
			alt: media.alt || media.alt_text || media.title || '',
		} ) );

		setAttributes( { images: prepared } );
	};

	const updateImageAlt = (index, newAlt) => {
		const updated = [ ...images ];
		if (!updated[index]) return;
		updated[index] = { ...updated[index], alt: newAlt };
		setAttributes( { images: updated } );
	};

	return (
		<>
			<BlockControls>
				<AlignmentControl
					value={ hAlign }
					onChange={ (val) =>
						setAttributes( { hAlign: val || 'center' } )
					}
					alignmentControls={ [
						{ icon: 'editor-alignleft', title: __( 'Left', 'gg-blocks' ), align: 'left' },
						{ icon: 'editor-aligncenter', title: __( 'Center', 'gg-blocks' ), align: 'center' },
						{ icon: 'editor-alignright', title: __( 'Right', 'gg-blocks' ), align: 'right' },
					] }
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody
					title={ __( 'Slider Images', 'gg-blocks' ) }
					initialOpen={ true }
				>
					<p>
						{ __(
							'Upload images for the hero background slider and edit their alt text below.',
							'gg-blocks'
						) }
					</p>

					<MediaUploadCheck>
						<MediaUpload
							onSelect={ handleSelectImages }
							allowedTypes={ [ 'image' ] }
							multiple
							gallery
							value={ images.map( (img) => img.id ) }
							render={ ( { open } ) => (
								<Button onClick={ open } variant="secondary">
									{ images.length
										? __( 'Replace Images', 'gg-blocks' )
										: __( 'Upload Images', 'gg-blocks' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>

					{ images && images.length > 0 && (
						<div className="mihh-image-alt-list">
							{ images.map( (img, index) => (
								<div
									className="mihh-image-alt-row"
									key={ img.id || index }
								>
									<div className="mihh-image-alt-thumb">
										{ img.url && (
											<img src={ img.url } alt="" />
										) }
									</div>
									<div className="mihh-image-alt-fields">
										<TextControl
											label={ __( 'Alt text', 'gg-blocks' ) }
											value={ img.alt || '' }
											onChange={ (val) =>
												updateImageAlt(index, val)
											}
											help={ __(
												'Describe this image for screen readers. Leave empty if decorative only.',
												'gg-blocks'
											) }
										/>
									</div>
								</div>
							) ) }
						</div>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Layout', 'gg-blocks' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Content Max Width (px)', 'gg-blocks' ) }
						value={ contentMaxWidth }
						onChange={ (value) =>
							setAttributes( { contentMaxWidth: value } )
						}
						min={ 600 }
						max={ 1400 }
						step={ 10 }
					/>
					<BoxControl
						label={ __( 'Padding', 'gg-blocks' ) }
						values={ padding }
						onChange={ (next) =>
							setAttributes( { padding: next } )
						}
						allowReset
					/>
					<BoxControl
						label={ __( 'Outer Margin (top/bottom)', 'gg-blocks' ) }
						values={ {
							top: margin?.top,
							bottom: margin?.bottom,
						} }
						onChange={ (next) =>
							setAttributes( {
								margin: {
									top: next?.top ?? margin?.top ?? '0',
									right: margin?.right ?? '0',
									bottom:
										next?.bottom ??
										margin?.bottom ??
										'0',
									left: margin?.left ?? '0',
								},
							} )
						}
						allowReset
					/>
					<RangeControl
						label={ __( 'Hero Height (vh)', 'gg-blocks' ) }
						value={ parseInt(heroHeight) }
						onChange={ (val) =>
							setAttributes( { heroHeight: `${ val }vh` } )
						}
						min={ 40 }
						max={ 100 }
						step={ 1 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Colors', 'gg-blocks' ) }
					initialOpen={ false }
				>
					<p style={ { marginBottom: 8 } }>
						{ __( 'Overlay Color', 'gg-blocks' ) }
					</p>
					<ColorPalette
						value={ overlayColor }
						onChange={ (value) =>
							setAttributes( { overlayColor: value } )
						}
					/>
					<RangeControl
						label={ __( 'Overlay Opacity', 'gg-blocks' ) }
						value={ overlayOpacity }
						onChange={ (value) =>
							setAttributes( { overlayOpacity: value } )
						}
						min={ 0 }
						max={ 1 }
						step={ 0.05 }
					/>
					<p
						style={ {
							marginTop: 16,
							marginBottom: 8,
						} }
					>
						{ __( 'Content Text Color', 'gg-blocks' ) }
					</p>
					<ColorPalette
						value={ contentTextColor }
						onChange={ (value) =>
							setAttributes( { contentTextColor: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Slider Settings', 'gg-blocks' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Slide Duration (ms)', 'gg-blocks' ) }
						value={ slideDuration }
						onChange={ (value) =>
							setAttributes( { slideDuration: value } )
						}
						min={ 1000 }
						max={ 10000 }
						step={ 500 }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ images && images.length ? (
					<div className="mihh-slider">
						{ images.map( (img, index) => (
							<div
								className={ `mihh-slide${
									index === 0 ? ' is-active' : ''
								}` }
								key={ img.id || index }
							>
								<img
									src={ img.url }
									alt={ img.alt || '' }
									className="mihh-slide-image"
								/>
							</div>
						) ) }
					</div>
				) : (
					<Placeholder
						label={ __( 'Multi Image Home Hero', 'gg-blocks' ) }
						instructions={ __(
							'Upload one or more images to use as the hero background slider.',
							'gg-blocks'
						) }
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ handleSelectImages }
								allowedTypes={ [ 'image' ] }
								multiple
								gallery
								render={ ( { open } ) => (
									<Button
										variant="primary"
										onClick={ open }
									>
										{ __( 'Upload Images', 'gg-blocks' ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
					</Placeholder>
				) }

				<div
					className="mihh-overlay"
					style={ overlayStyle }
				>
					<div
						className="mihh-inner alignwide"
						style={ innerStyle }
					>
						<InnerBlocks
							templateLock={ false }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
