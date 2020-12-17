import type { OptionGroup } from 'ts4ocds/extensions/options';

export interface OptionGroupType extends OptionGroup {
  relatedRequirementId?: string;
}
