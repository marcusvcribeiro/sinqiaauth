import { Component, Input, ElementRef, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NavigationItem } from './navigation';
import { NavigationService } from './navigation.service';
import { NavbarFullService } from '../navbar-full/navbar-full.service';
import { NavbarSimpleService } from '../navbar-simple/navbar-simple.service';

@Component({
  selector: 'alb-navigation',
  templateUrl: './navigation.component.html',
  host: {
    'class': 'alb-navigation'
  },
  animations: [
    trigger('openCloseAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.2s', style({ opacity: 0 }))
      ]),
    ])
  ]
})
export class NavigationComponent implements OnInit, OnDestroy {

  /**
   *
   * @description
   *
   * Input contendo os items para montar o menu de navegação
   *
   */
  @Input() items: NavigationItem[];

  /**
   * @description
   *
   * Propriedade utilizada para mudar o layout do menu para módulos em grupo.
   * Caso não passado nenhum valor numérico, sera criado o layout default
   */
  @Input() offsetAside: number;

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
   * Número de colunas no navbar-full
   */
  @Input() columnsNumber = 4;

  /**
   * Booleano para mudar título da aba durante a navegação
   */
  @Input() changeTabTitle = false;

  /**
   * @description
   *
   * Output emitido toda vez que um item da navegação é selecionado
   */
  @Output() changeItem: EventEmitter<NavigationItem> = new EventEmitter();

  /**
   * Output emitindo o item selecionado no favoritos
   */
  @Output() changeFavoriteItem: EventEmitter<NavigationItem> = new EventEmitter();

  /**
   * Output emitindo a lista completa do navbar quando um item é selecionado como favorito
   */
  @Output() changeFavoriteItemList: EventEmitter<NavigationItem[]> = new EventEmitter();

  selectedItem: NavigationItem;

  typeNavigation: 'simple' | 'full';

  private unsubscribe$ = new Subject();

  constructor(
    private elementRef: ElementRef,
    private navigationService: NavigationService,
    private navbarFullService: NavbarFullService,
    private navbarSimpleService: NavbarSimpleService) {}

  ngOnInit() {
    this.checkIfItemFavoriteSelectedChanged();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Observable executado quando um item é (des)marcado como favorito
   */
  checkIfItemFavoriteSelectedChanged() {
    this.navbarFullService.getItemFavoriteSelected()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((item) => {
      this.changeFavoriteItem.emit(item);
      this.changeFavoriteItemList.emit(this.items);
      this.navigationService.setNavbarList(this.items);
    });

    this.navbarSimpleService.getItemFavoriteSelected()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((item) => {
      this.changeFavoriteItem.emit(item);
      this.changeFavoriteItemList.emit(this.items);
      this.navigationService.setNavbarList(this.items);
    });
  }

  onSidenavClick(item: NavigationItem) {
    const { type } = item;
    if (item === this.selectedItem) {
      this.selectedItem = null;
      this.typeNavigation = null;
    } else if (type) {
      this.selectedItem = item;
      this.typeNavigation = type;
    } else {
      this.selectedItem = null;
      this.typeNavigation = null;
      this.changeItem.emit(item);
    }
  }

  onItemSelected(item: NavigationItem) {
    this.changeItem.emit(item);
    this.typeNavigation = null;
    this.selectedItem = null;
  }

  onNavbarSimpleLeave(event: MouseEvent) {
    const { clientX } = event;
    const { offsetWidth } = this.elementRef.nativeElement.querySelector('.alb-sidenav');

    if (clientX > (offsetWidth + 10)) {
      this.typeNavigation = null;
      this.selectedItem = null;
    }
  }

}
