import { useBlockProps, RichText } from '@wordpress/block-editor';

const getIconClassForService = (service) => {
	switch (service) {
		case 'linkedin':
			return 'fa-brands fa-linkedin';
		case 'github':
			return 'fa-brands fa-github';
		case 'twitter':
			return 'fa-brands fa-x-twitter';
		case 'facebook':
			return 'fa-brands fa-facebook-f';
		case 'instagram':
			return 'fa-brands fa-instagram';
		default:
			return 'fa-solid fa-link';
	}
};

const getLabelForService = (service) => {
	if (!service) return '';
	return service.charAt(0).toUpperCase() + service.slice(1);
};

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
		socialLinks = [],
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
							<img
								src={photoUrl}
								alt={name}
							/>
						</div>
					</div>
				</div>
			)}

			{/* TEXT COLUMN */}
			<div className="team-member-pro-content">
				<div className="name-title">
					{typeof name === 'string' && name.length > 0 && (
						<RichText.Content
							tagName="h3"
							value={name}
						/>
					)}

					{typeof title === 'string' && title.length > 0 && (
						<RichText.Content
							tagName="p"
							className="title"
							value={title}
						/>
					)}
				</div>

				<div className="contact-info">
					{phone && <p className="phone">{phone}</p>}

					{email && (
						<p className="email">
							<a href={`mailto:${email}`}>{email}</a>
						</p>
					)}

					{linkedInUrl && (
						<p className="linkedin">
							<a
								href={linkedInUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								<i
									className="fa-brands fa-linkedin"
									aria-hidden="true"
								></i>
								<span className="screen-reader-text">
									LinkedIn
								</span>
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
							<a
								href={linkUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								<i
									className="fa-solid fa-link"
									aria-hidden="true"
								></i>
								<span className="screen-reader-text">
									Link
								</span>
							</a>
						</p>
					)}
				</div>

				{/* SOCIAL ICONS ROW */}
				{socialLinks.length > 0 && (
					<div className="team-member-pro-social">
						{socialLinks.map((item, index) => {
							if (!item || !item.url || !item.service) {
								return null;
							}

							const service = item.service;
							const iconClass =
								item.iconClass ||
								getIconClassForService(service);
							const ariaLabel =
								item.ariaLabel ||
								getLabelForService(service);

							return (
								<a
									key={index}
									href={item.url}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={ariaLabel}
								>
									<i
										className={iconClass}
										aria-hidden="true"
									></i>
								</a>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}