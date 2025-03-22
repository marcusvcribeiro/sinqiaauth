import { Component, Input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'doc-tooltip',
  templateUrl: './tooltip.component.html',
  animations: [
    trigger('tooltip', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class TooltipComponent {

  /**
   *
   * @description
   *
   * Input de texto para o tooltip
   *
   */
  @Input() text = '';

  constructor() { }

}
