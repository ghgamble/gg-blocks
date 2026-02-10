import {
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
} from '@wordpress/block-editor';
import { Button, TextControl } from '@wordpress/components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Edit({ attributes, setAttributes }) {
    const { images = [] } = attributes;

    // Append selected images, pulling alt from Media Library
    const appendImages = (media) => {
        const newOnes = (media || []).map((m) => ({
            id: m.id ?? m.url,
            url: m.url,
            alt: m.alt || m.alt_text || m.title || '',
        }));
        setAttributes({ images: [...images, ...newOnes] });
    };

    // Replace all images, also pulling alt from Media Library
    const replaceImages = (media) => {
        const next = (media || []).map((m) => ({
            id: m.id ?? m.url,
            url: m.url,
            alt: m.alt || m.alt_text || m.title || '',
        }));
        setAttributes({ images: next });
    };

    const removeImage = (index) => {
        const next = [...images];
        next.splice(index, 1);
        setAttributes({ images: next });
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const next = Array.from(images);
        const [moved] = next.splice(result.source.index, 1);
        next.splice(result.destination.index, 0, moved);
        setAttributes({ images: next });
    };

    const updateAlt = (index, value) => {
        const next = [...images];
        if (!next[index]) return;
        next[index] = { ...next[index], alt: value };
        setAttributes({ images: next });
    };

    const blockProps = useBlockProps({ className: 'alignwide multi-img-grid' });

    return (
        <div {...blockProps}>
            <div
                className="buttons"
                style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}
            >
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={appendImages}
                        allowedTypes={['image']}
                        multiple
                        gallery
                        value={images.map((i) => i.id)}
                        render={({ open }) => (
                            <Button variant="primary" onClick={open}>
                                Add Images
                            </Button>
                        )}
                    />
                </MediaUploadCheck>

                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={replaceImages}
                        allowedTypes={['image']}
                        multiple
                        gallery
                        value={images.map((i) => i.id)}
                        render={({ open }) => (
                            <Button variant="secondary" onClick={open}>
                                Replace All
                            </Button>
                        )}
                    />
                </MediaUploadCheck>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="image-grid" direction="vertical">
                    {(provided) => (
                        <div
                            className="grid-wrapper"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {images.map((img, index) => (
                                <Draggable
                                    key={String(img.id ?? `img-${index}`)}
                                    draggableId={String(img.id ?? `img-${index}`)}
                                    index={index}
                                >
                                    {(drag) => (
                                        <figure
                                            className="styled-img-wrapper"
                                            ref={drag.innerRef}
                                            {...drag.draggableProps}
                                            {...drag.dragHandleProps}
                                        >
                                            <div className="image-inner">
                                                {img.url ? (
                                                    <img
                                                        src={img.url}
                                                        alt={img.alt || ''}
                                                    />
                                                ) : null}
                                            </div>

                                            {/* Alt text editing for accessibility */}
                                            <div style={{ marginTop: '6px' }}>
                                                <TextControl
                                                    label="Alt text"
                                                    value={img.alt || ''}
                                                    onChange={(val) =>
                                                        updateAlt(index, val)
                                                    }
                                                    help="Describe this image for screen readers. Leave blank only if the image is purely decorative."
                                                    aria-label={`Alt text for image ${index + 1}`}
                                                />
                                            </div>

                                            <div
                                                className="row-actions"
                                                style={{ marginTop: '6px' }}
                                            >
                                                <Button
                                                    variant="secondary"
                                                    isDestructive
                                                    onClick={() =>
                                                        removeImage(index)
                                                    }
                                                    size="small"
                                                    aria-label={`Remove image ${index + 1}`}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </figure>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}
