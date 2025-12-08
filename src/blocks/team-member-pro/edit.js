import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        photoUrl,
        name,
        title,
        bio,
        phone,
        email,
        linkedInUrl,
        linkText,
        linkUrl,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'team-member-pro-card',
    });

    return (
        <div {...blockProps}>
            {/* PHOTO COLUMN */}
            <div className="team-member-pro-photo styled-image-tm-block">
                <div className="styled-image-wrapper">
                    <div className="styled-image-aspect">
                        <MediaUpload
                            onSelect={(media) => setAttributes({ photoUrl: media.url })}
                            allowedTypes={['image']}
                            value={photoUrl}
                            render={({ open }) => (
                                <>
                                    {photoUrl ? (
                                        <img src={photoUrl} alt={name || __('Team member photo', 'gg-blocks')} onClick={open} />
                                    ) : (
                                        <Button onClick={open} variant="secondary">
                                            {__('Select Photo', 'gg-blocks')}
                                        </Button>
                                    )}
                                </>
                            )}
                        />
                    </div>
                </div>
            </div>

            {/* TEXT COLUMN */}
            <div className="team-member-pro-content">
                <RichText
                    tagName="h3"
                    value={name}
                    onChange={(value) => setAttributes({ name: value })}
                    placeholder={__('Name', 'gg-blocks')}
                />

                <RichText
                    tagName="p"
                    className="title"
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                    placeholder={__('Job Title', 'gg-blocks')}
                />

                <RichText
                    tagName="p"
                    className="phone"
                    value={phone}
                    onChange={(value) => setAttributes({ phone: value })}
                    placeholder={__('Phone (e.g., 303-543-1411 ext. 112)', 'gg-blocks')}
                />

                <RichText
                    tagName="p"
                    className="email"
                    value={email}
                    onChange={(value) => setAttributes({ email: value })}
                    placeholder={__('Email (e.g., dave@wrv.org)', 'gg-blocks')}
                />

                <RichText
                    tagName="p"
                    className="bio"
                    value={bio}
                    onChange={(value) => setAttributes({ bio: value })}
                    placeholder={__('Short Bio (1–2 sentences, rest on profile page)', 'gg-blocks')}
                />

                <RichText
                    tagName="p"
                    className="linkedin"
                    value={linkedInUrl}
                    onChange={(value) => {
                        // Strip any accidental <a> tags or HTML
                        const plainUrl = value.replace(/<\/?[^>]+(>|$)/g, '');
                        setAttributes({ linkedInUrl: plainUrl });
                    }}
                    placeholder={__(
                        'Full LinkedIn URL (optional, e.g., https://linkedin.com/in/username)',
                        'gg-blocks'
                    )}
                    allowedFormats={[]} // Prevent link formatting/pasting
                />

                <div className="link-section">
                    <RichText
                        tagName="p"
                        className="linkText"
                        value={linkText}
                        onChange={(value) => setAttributes({ linkText: value })}
                        placeholder={__('Extra link text (e.g., Read Bio)', 'gg-blocks')}
                    />
                    <RichText
                        tagName="p"
                        className="linkUrl"
                        value={linkUrl}
                        onChange={(value) => setAttributes({ linkUrl: value })}
                        placeholder={__('Extra link URL (optional)', 'gg-blocks')}
                    />
                </div>
            </div>
        </div>
    );
}
