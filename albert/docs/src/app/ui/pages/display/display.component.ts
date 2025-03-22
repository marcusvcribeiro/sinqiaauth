import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-display',
  templateUrl: './display.component.html'
})
export class DisplayDocComponent {
  openDS() {
    window.open('https://dev.sinqia.io/albert/design-system/components/dialog');
  }
}
