import { Component, Input } from '@angular/core';

@Component({
  selector: 'sq-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent {
  @Input() label: string;
  @Input() status: string;
}
