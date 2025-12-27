import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface SocialLink {
  icon: IconDefinition;
  label: string;
  href?: string;
  path?: string;
}
