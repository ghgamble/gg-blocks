import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const {
    mediaUrl,
    mediaAlt = '',
    backgroundColor = '#007399',
    gradientStopColor = '#007399'
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'page-banner alignfull',
    style: {
      '--base-color': backgroundColor,
      '--gradient-stop': gradientStopColor
    },
    role: 'region',
    'aria-label': 'Page Banner',
  });

  return (
    <div {...blockProps}>
      <div className="page-banner-wrapper">
        <div className="page-banner-image">
          <div className="gradient-overlay" aria-hidden="true"></div>
          {mediaUrl && (
            <img
              src={mediaUrl}
              alt={mediaAlt}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>
        <div className="page-banner-text">
          <div className="alignwide">
            <div className="inner-content">
              <InnerBlocks.Content />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
