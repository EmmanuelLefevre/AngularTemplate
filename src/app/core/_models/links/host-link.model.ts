import { IconDefinition } from '@fortawesome/angular-fontawesome';

export interface HostLink {
  labelKey: string;
  nameKey: string;
  url?: string;
}

export interface HostingConfig {
  developer: HostLink;
  host: HostLink & { addressKey: string };
  phone: {
    icon: IconDefinition;
    nameKey: string;
  };
}
