import { Component, Input } from '@angular/core';

@Component({
  selector: 'alb-loader',
  templateUrl: './loader.component.html',
  host: {
    'class': 'alb-loader',
    '[class.--dark]': 'type === "dark"',
    '[class.--light]': 'type === "light"',
  }
})
export class LoaderComponent {

  /**
   * @description
   * Tipo do estilo do loader
   *
   */
  @Input() type: 'dark' | 'light' = 'dark';

  /**
   * @description
   * Descricao do loader.
   *
   */
  @Input() description: string;

}
