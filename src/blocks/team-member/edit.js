import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { photoUrl, name, title, bio, phone, email, linkedInUrl } = attributes;

    const blockProps = useBlockProps({
        className: 'team-member-card'
    });

    return (
        <div {...blockProps}>
            <div className="styled-image-tm-block">
                <div className="styled-image-wrapper styled-image-1-1">
                    <div className="styled-image-aspect">
                        <MediaUpload
                            onSelect={(media) => setAttributes({ photoUrl: media.url })}
                            allowedTypes={['image']}
                            value={photoUrl}
                            render={({ open }) => (
                                <>
                                    {photoUrl ? (
                                        <img src={photoUrl} alt={name} onClick={open} />
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
                className="bio"
                value={bio}
                onChange={(value) => setAttributes({ bio: value })}
                placeholder={__('Short Bio', 'gg-blocks')}
            />
            <RichText
                tagName="p"
                className="phone"
                value={phone}
                onChange={(value) => setAttributes({ phone: value })}
                placeholder={__('Phone', 'gg-blocks')}
            />
            <RichText
                tagName="p"
                className="email"
                value={email}
                onChange={(value) => setAttributes({ email: value })}
                placeholder={__('Email', 'gg-blocks')}
            />
            <RichText
                tagName="p"
                className="linkedin"
                value={linkedInUrl}
                onChange={(value) => setAttributes({ linkedInUrl: value })}
                placeholder={__('LinkedIn: public profile, no full url, no slashes, ex gracegamble', 'gg-blocks')}
            />
        </div>
    );
}
