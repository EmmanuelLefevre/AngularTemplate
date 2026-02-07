import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface SocialLink {
  href?: string;
  path?: string;
  icon: IconDefinition;
  ariaKey: string;
  tooltipKey: string;
}
