import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';

enum Types {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  GHOST = 'ghost'
}

enum Colors {
  ACCENT = 'accent',
  WARN = 'warn',
  SUCCESS = 'success',
  LINK = 'link'
}

enum Sizes {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

@Component({
  selector: 'button[alb-button]',
  templateUrl: './button.component.html',
  host: {
    'class': 'alb-button',
    '[class.primary]': 'type === types.PRIMARY',
    '[class.secondary]': 'type === types.SECONDARY',
    '[class.tertiary]': 'type === types.TERTIARY',
    '[class.ghost]': 'type === types.GHOST',
    '[class.warn]': 'color === colors.WARN',
    '[class.success]': 'color === colors.SUCCESS',
    '[class.link]': 'color === colors.LINK',
    '[class.small]': 'size === sizes.SMALL',
    '[class.medium]': 'size === sizes.MEDIUM',
    '[class.large]': 'size === sizes.LARGE',
    '[class.icon]': 'icon || iconRight',
    '[class.icon-only]': 'iconOnly',
    '[class.icon-left]': 'icon && !iconOnly',
    '[class.icon-right]': 'iconRight'
  }
})
export class ButtonComponent {

  /**
   *
   * @description
   *
   * Tipo do alb-button, você pode utilizar os seguintes valores válidos:
   * - `primary`: estilo padrão do alb-button
   * - `secondary`
   * - `tertiary`
   * - `ghost`
   *
   */
  @Input() type: 'primary' | 'secondary' | 'tertiary' | `ghost` = Types.PRIMARY;

  /**
   *
   * @description
   *
   * Cor do alb-button, você pode utilizar os seguintes valores válidos de cor:
   *  - `accent`: cor padrão do alb-button
   *  - `success`: deve ser utilizado com o type `primary`
   *  - `warn`: deve ser utilizado com o type `primary`
   *  - `link`: deve ser utilizado com o type `tertiary`
   *
   */
  @Input() color: 'accent' | 'warn' | 'success' | 'link' = Colors.ACCENT;

  /**
   *
   * @description
   *
   * Tamanho do alb-button, você pode utilizar os seguintes valores válidos:
   * - `small`
   * - `medium`
   * - `large`: tamanho padrão do alb-button.
   *
   */
  @Input() size: 'small' | 'medium' | 'large' = 'large';

  /**
   *
   * @description
   *
   * Define se o botão é apenas com ícone.
   *
   */
   _iconOnly: boolean;
   @Input()
   set iconOnly(value: boolean) {
     this._iconOnly = coerceBooleanProperty(value);
   }
   get iconOnly(): boolean {
     return this._iconOnly;
   }

  /**
   *
   * @description
   *
   * Define o ícone do material design que será exibido à esquerda do botão ou no botão sem texto.
   *
   */
  @Input() icon: string;

  /**
   *
   * @description
   *
   * Define o ícone do material design que será exibido à direita do botão.
   *
   */
  @Input() iconRight: string;

  types = Types;
  colors = Colors;
  sizes = Sizes;
}
