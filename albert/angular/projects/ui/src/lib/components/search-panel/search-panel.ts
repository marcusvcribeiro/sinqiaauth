import { QueryList } from '@angular/core';
import { SearchPanelChipDirective } from './search-panel-chip.directive';

export interface SearchPanelOptions {
    component: any;
    autoUpdate?: boolean;
    disablePanelCloseOnSearch?: boolean;
}

export interface SearchPanelChipsInterface {
    chips: QueryList<SearchPanelChipDirective>;
}
