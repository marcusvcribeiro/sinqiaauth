import { Component, OnInit } from '@angular/core';
import { SearchPanelOptions } from '@albert/ui/lib/components/search-panel/search-panel';
import { PanelRef } from '@albert/ui';
@Component({
  selector: 'doc-search-panel',
  templateUrl: './search-panel.component.html'
})
export class SearchPanelDocComponent {

  openDS() {
    window.open('https://dev.sinqia.io/albert/design-system/components/search-panel');
  }

  configurarOutput(panelRef: PanelRef) {
    panelRef.component.instance.formDados.subscribe((res) => {
      console.log(res);
    });
  }
 }
