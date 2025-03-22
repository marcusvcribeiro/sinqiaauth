import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { SidenavItem } from './sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'alb-sidenav',
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent {

  /**
   *
   * @description
   *
   * Input do tipo Array<SideNav> utilizado para montar os elementos do sidenav
   *
   */
  @Input() items: SidenavItem[];

  /**
   *
   * @description
   *
   * Input para saber se possui algum item do sidenav selecionado
   *
   */
  @Input() selectedItem: SidenavItem;

  /**
   *
   * @description
   *
   * Output para emitir um objeto contendo informações sobre o item clicado.
   *
   */
  @Output() sidenavClick: EventEmitter<SidenavItem> = new EventEmitter<SidenavItem>();

  constructor(private router: Router) {}

  /**
   *
   * @description
   *
   * Método chamado ao clicar em um ícone do sidenav
   * Se ele clicar no item que ja estiver selecionado, ele devera ser fechado
   *
   */
  onClickSidenavItem(item: SidenavItem) {
    const { path, onClick } = item;

    if (path) {
      this.router.navigate([path]);
    }

    if (onClick instanceof Function) {
      onClick(item);
    }

    this.sidenavClick.emit(item);
  }
}
