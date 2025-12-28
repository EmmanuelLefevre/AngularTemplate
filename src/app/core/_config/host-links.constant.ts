import { HostingConfig } from '../_models/host-link.model';

import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

export const HOSTING_INFOS: HostingConfig = {
  developer: {
    labelKey: 'FOOTER.DEVELOPPER',
    nameKey: 'FOOTER.DEVELOPPER_NAME',
    url: 'https://www.emmanuellefevre.com/'
  },
  host: {
    labelKey: 'FOOTER.HOST',
    nameKey: 'FOOTER.HOST_NAME',
    addressKey: 'FOOTER.HOST_ADDRESS',
    url: 'https://www.planethoster.fr/'
  },
  phone: {
    icon: faPhoneAlt,
    nameKey: 'FOOTER.HOST_PHONE'
  }
};
