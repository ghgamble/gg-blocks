import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const onlyIf = (v) => (v && v !== '0' ? v : undefined);

export default function save( { attributes } ) {
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

	const blockProps = useBlockProps.save( {
		className: 'multi-image-home-hero alignfull',
		style: {
			marginTop: onlyIf(margin?.top),
			marginBottom: onlyIf(margin?.bottom),
			height: heroHeight,
		},
		'data-transition-time': slideDuration,
		role: 'region',
		'aria-label': 'Multi Image Home Hero',
	} );

	return (
		<div { ...blockProps }>
			{ images && images.length > 0 && (
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
			) }

			<div
				className="mihh-overlay"
				style={ {
					background:
						overlayColor && overlayOpacity != null
							? `rgba(0,0,0,${ overlayOpacity })`
							: undefined,
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
				} }
			>
				<div
					className="mihh-inner alignwide"
					style={ {
						maxWidth: contentMaxWidth
							? `${ contentMaxWidth }px`
							: undefined,
						width: '100%',
						color: contentTextColor,
					} }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
