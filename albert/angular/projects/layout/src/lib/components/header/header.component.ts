import { OnInit } from '@angular/core';
import { Component, Input, Directive } from '@angular/core';
@Component({
  selector: 'alb-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  /**
   *
   * @description
   *
   * Input string que seta o nome da Aplicação no header
   *
   */
  @Input() name: string;

  /**
   *
   * @description
   *
   * Input string que seta a descrição da Aplicação no header
   *
   */
  @Input() description: string;

  /**
   *
   * @description
   *
   * Input string que seta a cor do icone do logo Sinqia
   *
   */
  @Input() logoColor: string;

  constructor() { }

  ngOnInit(): void {}
}

@Directive({
  selector: 'alb-header-group',
  host: {
    'class': 'alb-header-group'
  },
})
export class HeaderGroupDirective { }
