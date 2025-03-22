import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardDocComponent {
  openDS() {
    window.open('https://dev.sinqia.io/albert/design-system/components/card');
  }
 }
