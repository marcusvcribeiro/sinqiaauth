import { Component, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'button[alb-button-icon]',
  templateUrl: './button-icon.component.html',
  host: {
    'class': 'alb-button-icon',
    '[class.pure]': 'pure === true'
  }
})
export class ButtonIconComponent {

  /**
   *
   * @description
   *
   * Define o ícone do material design que será exibido dentro do botão.
   *
   */
  @Input() icon: string;

  _pure: boolean;
  @Input()
  set pure(value: boolean) {
    this._pure = coerceBooleanProperty(value);
  }

  get pure(): boolean {
    return this._pure;
  }

}
