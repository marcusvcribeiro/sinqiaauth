import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-button-doc',
  templateUrl: './button.component.html'
})
export class ButtonDocComponent {
  openDS() {
    window.open('https://dev.sinqia.io/albert/platform/design-system/next/components/buttons/');
  }
 }
