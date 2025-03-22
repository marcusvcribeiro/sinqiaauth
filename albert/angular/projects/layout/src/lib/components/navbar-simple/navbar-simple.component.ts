import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NavbarSimpleService } from './navbar-simple.service';
import { NavbarSimpleItem } from './navbar-simple';

/**
 * @description
 *
 * O alb-navbar-simple é uma seção que irá conter os links para a navegação para outras páginas.
 * Para isso ele recebe um Input 'items' do tipo NavbarSimpleItem para montar a hierarquia do navbar
 * Além disso, ele possui um Output para avisar quando ocorreu uma ação que deveria fechar o navbar
 *
 * ## Exemplo
 *
 *
 */
@Component({
  selector: 'alb-navbar-simple',
  templateUrl: './navbar-simple.component.html',
})
export class NavbarSimpleComponent implements OnInit, OnDestroy {

  /**
   *
   * @description
   *
   * Input do tipo Array<NavbarSimple> que deve conter a lista de itens do navbar-simple
   *
   */
  @Input() items: NavbarSimpleItem[];

  /**
   * @description
   *
   * Booleano para mudar o titulo de aba ou não
   */
  @Input() changeTabTitle = false;

  /**
   * @description
   *
   * Caso a aplicação adicione algum caminho padrão na URL (fora os caminhos de rota), deve-se passar
   * esse caminho padrão aqui.
   * Por exemplo, quando subimos alguma aplicação com Docker, é preciso configurar um caminho padrão na URL
   * como em: dev.sinqia.io/albert/docs e os caminhos das rotas (que é a parte variavel da URL)
   * vem em seguida, como em: https://dev.sinqia.io/albert/docs/layout/navbar-full
   */
  @Input() urlPath = '';

  /**
   * @description
   *
   * Item selecionado - Output emitido toda vez que um item da lista for selecionado.
   */
  @Output() changeItem: EventEmitter<NavbarSimpleItem> = new EventEmitter();

  /**
   * @description
   *
   * Output emitido sempre quando o mouse sai do SidenavSimple
   */
  @Output() mouseLeave: EventEmitter<MouseEvent> = new EventEmitter();

  /**
   *
   * @description
   *
   * Subject para executar o unsubscribe
   *
   */
  private unsubscribe$ = new Subject<any>();

  constructor(private navbarSimpleService: NavbarSimpleService) { }


  ngOnInit() {
    this.navbarSimpleService.getItemClicked()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((item) => {
        this.changeItem.emit(item);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onMouseLeave(event: MouseEvent) {
    this.mouseLeave.emit(event);
  }
}
