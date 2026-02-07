import { SocialLink } from '@core/_models/links/social-link.model';

import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const EXTERNAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/emmanuel-l-06350b167/',
  github: 'https://github.com/EmmanuelLefevre/',
  portfolio: 'https://www.emmanuellefevre.com/',
  host: 'https://www.planethoster.com/'
} as const;

export const FOOTER_SOCIAL_LINKS: SocialLink[] = [
  {
    href: EXTERNAL_LINKS.linkedin,
    icon: faLinkedin,
    ariaKey: 'LAYOUT.FOOTER.SOCIAL_LINKS.LINKEDIN.ARIA',
    tooltipKey: 'LAYOUT.FOOTER.SOCIAL_LINKS.LINKEDIN.TOOLTIP'
  },
  {
    href: EXTERNAL_LINKS.github,
    icon: faGithub,
    ariaKey: 'LAYOUT.FOOTER.SOCIAL_LINKS.GITHUB.ARIA',
    tooltipKey: 'LAYOUT.FOOTER.SOCIAL_LINKS.GITHUB.TOOLTIP'
  },
  {
    path: '/contact',
    icon: faEnvelope,
    ariaKey: 'LAYOUT.FOOTER.SOCIAL_LINKS.CONTACT.ARIA',
    tooltipKey: 'LAYOUT.FOOTER.SOCIAL_LINKS.CONTACT.TOOLTIP'
  }
];
