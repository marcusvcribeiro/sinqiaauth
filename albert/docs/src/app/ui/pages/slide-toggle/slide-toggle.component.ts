import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-slide-toggle',
  templateUrl: './slide-toggle.component.html'
})
export class SlideToggleDocComponent {
  openDS() {
    window.open('https://dev.sinqia.io/albert/design-system/components/button-slide-toggle');
  }
 }
