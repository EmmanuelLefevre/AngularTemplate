import { HostingConfig } from '@core/_models/links/host-link.model';
import { EXTERNAL_LINKS } from './social-links.constant';

import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

export const HOSTING_INFOS: HostingConfig = {
  developer: {
    labelKey: 'LAYOUT.FOOTER.CREDITS.DEVELOPED_BY_PREFIX',
    nameKey: 'LAYOUT.FOOTER.CREDITS.DEVELOPER_NAME',
    url: EXTERNAL_LINKS.portfolio,
    ariaKey: 'LAYOUT.FOOTER.SOCIAL_LINKS.PORTFOLIO.ARIA',
    tooltipKey: 'LAYOUT.FOOTER.SOCIAL_LINKS.PORTFOLIO.TOOLTIP'
  },

  host: {
    labelKey: 'LAYOUT.FOOTER.CREDITS.HOSTED_BY_PREFIX',
    nameKey: 'LAYOUT.FOOTER.CREDITS.HOST_PROVIDER_NAME',
    addressKey: 'LAYOUT.FOOTER.ADDRESS.STREET',
    url: EXTERNAL_LINKS.host,
    ariaKey: 'LAYOUT.FOOTER.SOCIAL_LINKS.HOST.ARIA',
    tooltipKey: 'LAYOUT.FOOTER.SOCIAL_LINKS.HOST.TOOLTIP'
  },

  phone: {
    icon: faPhoneAlt,
    nameKey: 'LAYOUT.FOOTER.ADDRESS.PHONE'
  }
};
