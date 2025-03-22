import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-panel',
  templateUrl: './panel.component.html'
})
export class PanelDocComponent {
  openDS() {
    window.open('https://dev.sinqia.io/albert/design-system/components/panel');
  }
 }
