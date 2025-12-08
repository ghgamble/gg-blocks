import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
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

    const blockProps = useBlockProps.save({
        className: 'team-member-pro-card',
    });

    return (
        <div {...blockProps}>
            {/* PHOTO COLUMN */}
            {photoUrl && (
                <div className="team-member-pro-photo styled-image-tm-block">
                    <div className="styled-image-wrapper">
                        <div className="styled-image-aspect">
                            <img src={photoUrl} alt={name} />
                        </div>
                    </div>
                </div>
            )}

            {/* TEXT COLUMN */}
            <div className="team-member-pro-content">
                <div className="name-title">
                    {name && <RichText.Content tagName="h3" value={name} />}

                    {title && (
                        <RichText.Content
                            tagName="p"
                            className="title"
                            value={title}
                        />
                    )}
                </div>

                <div className="contact-info">
                    {phone && (
                        <p className="phone">{phone}</p>
                    )}

                    {email && (
                        <p className="email">
                            <a href={`mailto:${email}`}>{email}</a>
                        </p>
                    )}

                    {linkedInUrl && (
                        <p className="linkedin">
                            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
                                <span className="screen-reader-text">LinkedIn</span>
                            </a>
                        </p>
                    )}                    
                </div>

                {bio && (
                    <RichText.Content
                        tagName="p"
                        className="bio"
                        value={bio}
                    />
                )}

                <div className="link-section">
                    {linkText && (
                        <RichText.Content
                            tagName="p"
                            className="linkText"
                            value={linkText}
                        />
                    )}
                    {linkUrl && (
                        <p className="linkUrl">
                            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                                <i className="fa-solid fa-link" aria-hidden="true"></i>
                                <span className="screen-reader-text">Link</span>
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
