import { Component } from '@angular/core';

@Component({
  selector: 'doc-button-toggle',
  templateUrl: './button-toggle.component.html'
})
export class ButtonToggleDocComponent {
  openDS() {
    window.open('https://dev.sinqia.io/albert/design-system/components/button-toggle');
  }
}
