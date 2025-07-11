import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    mediaUrl,
    mediaAlt,
    borderRadius = 8,
    objectFit = 'cover',
    applyShadow = true,
    width = 100,
    aspectRatio = 'original'
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'styled-image-block'
  });

  return (
    <div {...blockProps}>
      {mediaUrl && (
        <div className={`styled-image-wrapper styled-image-${aspectRatio}`}>
          <div
            className="styled-image-aspect"
            style={{
              width: `${width}%`,
              borderRadius: `${borderRadius}px`,
              overflow: 'hidden',
              boxShadow: applyShadow ? '0 4px 16px rgba(0,0,0,0.15)' : 'none'
            }}
          >
            <img
              src={mediaUrl}
              alt={mediaAlt || ''}
              style={{
                width: '100%',
                height: '100%',
                objectFit: objectFit
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
