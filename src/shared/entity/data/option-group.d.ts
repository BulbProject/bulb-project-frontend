import type { OptionGroup } from 'ts4ocds/extensions/options';
import type { OptionType } from './option';

export interface OptionGroupType extends OptionGroup {
  options: OptionType[];
}
