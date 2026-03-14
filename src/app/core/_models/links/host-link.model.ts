import { IconDefinition } from '@fortawesome/angular-fontawesome';

export interface HostLink {
  labelKey: string;
  nameKey: string;
  url: string;
}

export interface HostingConfig {
  developer: HostLink & {
    ariaKey: string;
    tooltipKey: string;
  };

  host: HostLink & {
    addressKey: string;
    ariaKey: string;
    tooltipKey: string;
  };

  phone: {
    icon: IconDefinition;
    nameKey: string;
  };
}
