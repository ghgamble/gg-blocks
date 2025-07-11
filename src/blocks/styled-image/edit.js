import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  MediaUpload,
  InspectorControls
} from '@wordpress/block-editor';
import {
  PanelBody,
  RangeControl,
  SelectControl,
  Button,
  ToggleControl
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const {
    mediaUrl,
    mediaAlt,
    borderRadius = 8,
    objectFit = 'cover',
    applyShadow = true,
    width = 100,
    aspectRatio = 'original'
  } = attributes;

  const blockProps = useBlockProps({ className: 'styled-image-block' });

  const handleKeyDown = (event, open) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open();
    }
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Image Settings', 'styled-image')} initialOpen={true}>
          <RangeControl
            label={__('Image Width (%)', 'styled-image')}
            value={width}
            onChange={(value) => setAttributes({ width: value })}
            min={20}
            max={100}
          />
          <RangeControl
            label={__('Border Radius (px)', 'styled-image')}
            value={borderRadius}
            onChange={(value) => setAttributes({ borderRadius: value })}
            min={0}
            max={100}
          />
          <SelectControl
            label={__('Object Fit', 'styled-image')}
            value={objectFit}
            options={[
              { label: 'Cover', value: 'cover' },
              { label: 'Contain', value: 'contain' },
              { label: 'Fill', value: 'fill' },
              { label: 'None', value: 'none' },
              { label: 'Scale Down', value: 'scale-down' }
            ]}
            onChange={(value) => setAttributes({ objectFit: value })}
          />
          <SelectControl
            label={__('Aspect Ratio', 'styled-image')}
            value={aspectRatio}
            options={[
              { label: 'Original', value: 'original' },
              { label: 'Square (1:1)', value: '1-1' },
              { label: 'Landscape (4:3)', value: '4-3' },
              { label: 'Portrait (3:4)', value: '3-4' },
              { label: 'Tall (2:3)', value: '2-3' }
            ]}
            onChange={(value) => setAttributes({ aspectRatio: value })}
          />
          <ToggleControl
            label={__('Apply Drop Shadow', 'styled-image')}
            checked={applyShadow}
            onChange={(value) => setAttributes({ applyShadow: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <MediaUpload
          onSelect={(media) =>
            setAttributes({
              mediaUrl: media.url,
              mediaAlt: media.alt || ''
            })
          }
          type="image"
          value={mediaUrl}
          render={({ open }) => (
            <div
              onClick={open}
              onKeyDown={(e) => handleKeyDown(e, open)}
              role="button"
              tabIndex={0}
              aria-label={
                mediaUrl
                  ? __('Edit uploaded image', 'styled-image')
                  : __('Upload image', 'styled-image')
              }
              className={`styled-img-wrapper styled-img-${aspectRatio}`}
            >
              {mediaUrl ? (
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
              ) : (
                <Button variant="secondary">
                  {__('Upload Image', 'styled-image')}
                </Button>
              )}
            </div>
          )}
        />
      </div>
    </>
  );
}
