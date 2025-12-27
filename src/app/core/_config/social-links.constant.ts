import { SocialLink } from '@core/_models/social-link.model';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const EXTERNAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/emmanuel-l-06350b167/',
  github: 'https://github.com/EmmanuelLefevre/',
  portfolio: 'https://www.emmanuellefevre.com/'
} as const;

export const FOOTER_SOCIAL_LINKS: SocialLink[] = [
  {
    href: EXTERNAL_LINKS.linkedin,
    icon: faLinkedin,
    label: 'FOOTER.LINKS.LINKEDIN'
  },
  {
    href: EXTERNAL_LINKS.github,
    icon: faGithub,
    label: 'FOOTER.LINKS.GITHUB'
  },
  {
    path: '/contact',
    icon: faEnvelope,
    label: 'FOOTER.LINKS.CONTACT'
  }
];
