import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	MediaUpload,
} from '@wordpress/block-editor';
import {
	Button,
	TextControl,
	SelectControl,
} from '@wordpress/components';

const SOCIAL_OPTIONS = [
	{ label: __('Select a service…', 'gg-blocks'), value: '' },
	{ label: 'LinkedIn', value: 'linkedin' },
	{ label: 'GitHub', value: 'github' },
	{ label: 'X / Twitter', value: 'twitter' },
	{ label: 'Facebook', value: 'facebook' },
	{ label: 'Instagram', value: 'instagram' },
];

const getIconClassForService = (service) => {
	switch (service) {
		case 'linkedin':
			return 'fa-brands fa-linkedin';
		case 'github':
			return 'fa-brands fa-github';
		case 'twitter':
			// use x-twitter if you have it loaded, fallback to twitter
			return 'fa-brands fa-x-twitter';
		case 'facebook':
			return 'fa-brands fa-facebook-f';
		case 'instagram':
			return 'fa-brands fa-instagram';
		default:
			return 'fa-solid fa-link';
	}
};

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
		socialLinks = [],
	} = attributes;

	const blockProps = useBlockProps({
		className: 'team-member-pro-card',
	});

	// ----- social repeater handlers -----

	const addSocialLink = () => {
		const next = [
			...socialLinks,
			{
				service: '',
				url: '',
				iconClass: '',
				ariaLabel: '',
			},
		];
		setAttributes({ socialLinks: next });
	};

	const updateSocialLink = (index, field, value) => {
		const next = socialLinks.map((item, i) => {
			if (i !== index) return item;

			const updated = { ...item, [field]: value };

			// If service changes, auto-fill iconClass & ariaLabel if empty
			if (field === 'service') {
				const iconClass = getIconClassForService(value);
				const ariaLabel = value
					? value.charAt(0).toUpperCase() + value.slice(1)
					: '';
				if (!item.iconClass) updated.iconClass = iconClass;
				if (!item.ariaLabel) updated.ariaLabel = ariaLabel;
			}

			return updated;
		});

		setAttributes({ socialLinks: next });
	};

	const removeSocialLink = (index) => {
		const next = socialLinks.filter((_, i) => i !== index);
		setAttributes({ socialLinks: next });
	};

	return (
		<div {...blockProps}>
			{/* PHOTO COLUMN */}
			<div className="team-member-pro-photo styled-image-tm-block">
				<div className="styled-image-wrapper">
					<div className="styled-image-aspect">
						<MediaUpload
							onSelect={(media) =>
								setAttributes({ photoUrl: media.url })
							}
							allowedTypes={['image']}
							value={photoUrl}
							render={({ open }) => (
								<>
									{photoUrl ? (
										<img
											src={photoUrl}
											alt={
												name ||
												__(
													'Team member photo',
													'gg-blocks'
												)
											}
											onClick={open}
										/>
									) : (
										<Button
											onClick={open}
											variant="secondary"
										>
											{__(
												'Select Photo',
												'gg-blocks'
											)}
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
					onChange={(value) =>
						setAttributes({ name: value })
					}
					placeholder={__('Name', 'gg-blocks')}
				/>

				<RichText
					tagName="p"
					className="title"
					value={title}
					onChange={(value) =>
						setAttributes({ title: value })
					}
					placeholder={__('Job Title', 'gg-blocks')}
				/>

				<RichText
					tagName="p"
					className="phone"
					value={phone}
					onChange={(value) =>
						setAttributes({ phone: value })
					}
					placeholder={__(
						'Phone (e.g., 303-543-1411 ext. 112)',
						'gg-blocks'
					)}
				/>

				<RichText
					tagName="p"
					className="email"
					value={email}
					onChange={(value) =>
						setAttributes({ email: value })
					}
					placeholder={__(
						'Email (e.g., dave@wrv.org)',
						'gg-blocks'
					)}
				/>

				<RichText
					tagName="p"
					className="bio"
					value={bio}
					onChange={(value) =>
						setAttributes({ bio: value })
					}
					placeholder={__(
						'Short Bio (1–2 sentences, rest on profile page)',
						'gg-blocks'
					)}
				/>

				<RichText
					tagName="p"
					className="linkedin"
					value={linkedInUrl}
					onChange={(value) => {
						// Strip any accidental <a> tags or HTML
						const plainUrl = value.replace(
							/<\/?[^>]+(>|$)/g,
							''
						);
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
						onChange={(value) =>
							setAttributes({ linkText: value })
						}
						placeholder={__(
							'Extra link text (e.g., Read Bio)',
							'gg-blocks'
						)}
					/>
					<RichText
						tagName="p"
						className="linkUrl"
						value={linkUrl}
						onChange={(value) =>
							setAttributes({ linkUrl: value })
						}
						placeholder={__(
							'Extra link URL (optional)',
							'gg-blocks'
						)}
					/>
				</div>

				{/* SOCIAL ICON REPEATER */}
				<div className="team-member-pro-social-editor">
					<p className="tm-social-label">
						{__('Social links (optional)', 'gg-blocks')}
					</p>

					{socialLinks.map((item, index) => (
						<div
							key={index}
							className="tm-social-row"
						>
							<SelectControl
								label={__('Service', 'gg-blocks')}
								value={item.service || ''}
								options={SOCIAL_OPTIONS}
								onChange={(value) =>
									updateSocialLink(
										index,
										'service',
										value
									)
								}
							/>

							<TextControl
								label={__('Profile URL', 'gg-blocks')}
								value={item.url || ''}
								onChange={(value) =>
									updateSocialLink(
										index,
										'url',
										value
									)
								}
								placeholder="https://example.com/username"
							/>

							<TextControl
								label={__('ARIA label (optional)', 'gg-blocks')}
								value={item.ariaLabel || ''}
								onChange={(value) =>
									updateSocialLink(
										index,
										'ariaLabel',
										value
									)
								}
								placeholder={__(
									'e.g., GitHub',
									'gg-blocks'
								)}
							/>

							<Button
								variant="secondary"
								isDestructive
								onClick={() =>
									removeSocialLink(index)
								}
							>
								{__('Remove', 'gg-blocks')}
							</Button>
						</div>
					))}

					<Button
						variant="secondary"
						onClick={addSocialLink}
					>
						{__('Add Social Link', 'gg-blocks')}
					</Button>
				</div>
			</div>
		</div>
	);
}