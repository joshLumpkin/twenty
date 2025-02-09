import { IconComponent } from '@/ui/display/icon/types/IconComponent';

import { FilterType } from './FilterType';

export type FilterDefinition = {
  fieldMetadataId: string;
  label: string;
  iconName: string;
  type: FilterType;
  entitySelectComponent?: JSX.Element;
  selectAllLabel?: string;
  SelectAllIcon?: IconComponent;
};
