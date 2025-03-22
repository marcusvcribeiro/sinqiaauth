import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NavbarFullItem } from './navbar-full';
import { Router } from '@angular/router';
import { NavbarFullService } from './navbar-full.service';
import { Subject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';

@Component({
  selector: 'alb-navbar-full',
  templateUrl: './navbar-full.component.html',
  host: {
    'class': 'alb-navbarfull',
    '[class.--has-module]': 'offsetAside > 0',
  }
})
export class NavbarFullComponent implements OnInit, OnDestroy {

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
   * Árvore de items para gerar a lista de navegação .
   */
  @Input() items: NavbarFullItem[];

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
   * @description
   *
   * Booleano para mudar o titulo de aba ou não
   */
  @Input() changeTabTitle = false;

  /**
   * @description
   *
   * Item selecionado - Output emitido toda vez que um item da lista for selecionado.
   */
  @Output() changeItem = new EventEmitter();

  listItems: NavbarFullItem[];
  asideItems: NavbarFullItem[];
  listItemsChildren = [];

  /**
   * @description
   *
   * Propriedade utilitaria para realizar os unsubscribe nos Observables do componente
   */
  private unsubscribe$ = new Subject();

  constructor(
    private router: Router,
    private navbarFullService: NavbarFullService,
  ) { }

  ngOnInit() {
    this.checkLayoutIsSimpleOrAside();
    this.checkIfItemSelectedHasChanged();
    this.checkIfItemSelectedAsideHasChanged();
    this.listChildren(this.items);
  }

  /**
   * Gera a lista de filhos para o ng-select.
   */
  listChildren(list, parentName?) {
    for (const item of list) {
      if (!item.children || item.children.length === 0) {
        if (parentName) {
          item.parentName = parentName;
        }
        this.listItemsChildren.push(item);
      } else {
        this.listChildren(item.children, item.name);
      }
    }
  }

  /**
   * Verifica se a inicialização da lista será de forma Simples ou de forma com a a Barra Lateral (Aside)
   */
  checkLayoutIsSimpleOrAside() {
    if (this.offsetAside > 0) {
      this.asideItems = this.navbarFullService.filterOffsetAside(this.items, this.offsetAside);
      this.navbarFullService.setItemSelectedAside(this.items[0]);
    } else {
      this.listItems = this.items;
    }
  }

  /**
   * Observable executado quando algum item selecionado é alterado
   */
  checkIfItemSelectedHasChanged() {
    this.navbarFullService.getItemSelected()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(item => this.onItemSelected(item));
  }

  /**
   * Observable executado quando uma mudança no aside ocorre
   */
  checkIfItemSelectedAsideHasChanged() {
    if (this.offsetAside > 0) {
      this.navbarFullService.getItemSelectedAside()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((item) => {
          if (!item) {
            return;
          }

          if (item.id != null) {
            this.listItems = this.navbarFullService.findIdLinks(this.items, item.id);
            return;
          }

          this.listItems = this.navbarFullService.findLinks(this.items, item.name);
        });
    }
  }

  /**
   *
   * @param item - Item do menu selecionado
   *
   * Quando um item do navbar é selecionado é emitido um evento @Output e verificado qual tipo de chamada é realizada
   * Caso não haver nenhum filho no NavbarFullItem, ele é navegado para sua rota específica.
   * (navegação ou click callback). O botão 'Fechar' emite 'null' no item selecionado
   */
  onItemSelected(item: NavbarFullItem) {
    if (!item) {
      this.changeItem.emit(null);
      return;
    }
    const { path, onClick } = item;

    if (path) {
      if (this.changeTabTitle) {
        document.title = item.name;
      }
      this.router.navigate([path]);
    }

    if (onClick instanceof Function) {
      onClick(item);
    }
    this.changeItem.emit(item);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

@Component({
  selector: 'alb-navbar-full-aside',
  template: `
  <ul class="alb-navbarfull-aside">
    <li
      *ngFor="let item of items"
      class="alb-navbarfull-item alb-navbarfull-item-title"
      [class.--selected]="(navbarFullService.getItemSelectedAside() | async)?.id === item?.id"
      (click)="onItemSelected(item, $event)">
        {{ item.name }}
      <alb-navbar-full-aside [items]="item?.children"></alb-navbar-full-aside>
    </li>
  </ul>
  `,
})
export class NavbarFullAsideComponent {
  @Input() items: NavbarFullItem;

  constructor(public navbarFullService: NavbarFullService) { }

  onItemSelected(item: NavbarFullItem, event: Event) {
    event.stopPropagation();
    this.navbarFullService.setItemSelectedAside(item);
  }
}

@Component({
  selector: 'alb-navbar-full-item',
  template: `
  <ul
    class="alb-navbarfull-list"
    [class.alb-navbarfull-border-parent-item]="index > 1 && !lastItem"
    [ngClass]="getNavbarGrid()">
    <li
      *ngFor="let item of items; let itemIndex = index; let lastItem = last"
      class="alb-navbarfull-item"
      [class.alb-navbarfull-item-title]="item.children"
      [class.--link]="item.path || item.onClick"
      [class.alb-navbarfull-item-margin]="index > 1"
      [class.alb-navbarfull-item-parent]="index == 0"
      (click)="onItemSelected(item, $event)">
      <div
        class="alb-navbarfull-text"
        [class.alb-navbarfull-first-item]="itemIndex == 0"
        [class.alb-navbarfull-item-list]="index != 0">
          <ng-container *ngIf="item.path">
            <i *ngIf="!item.favorite" class="alb-icon alb-navbarfull-icon" (click)="onFavoriteClick(item, $event)">star_outline</i>
            <i
              *ngIf="item.favorite"
              class="alb-icon alb-navbarfull-icon alb-navbarfull-star-icon"
              (click)="onFavoriteClick(item, $event)">
              star
            </i>
            <i class="alb-icon alb-navbarfull-icon" (click)="onNewTabNavigate(item, $event)">launch</i>
          </ng-container>
          <span class="alb-navbarfull-name">{{ item.name }}</span>
        </div>
      <alb-navbar-full-item
        *ngIf="item?.children && item?.children.length > 0"
        [columnsNumber]="columnsNumber"
        [index]="index + 1"
        [items]="item?.children"
        [urlPath]="urlPath"
        [changeTabTitle]="changeTabTitle"
        [lastItem]="lastItem">
      </alb-navbar-full-item>
    </li>
  </ul>
  `
})
export class NavbarFullItemComponent {
  @Input() items: NavbarFullItem;
  @Input() index = 0;
  @Input() urlPath = '';
  @Input() columnsNumber = 4;
  @Input() changeTabTitle = false;
  @Input() lastItem = false;

  constructor(public navbarFullService: NavbarFullService) { }

  onItemSelected(item: NavbarFullItem, event: Event) {
    event.stopPropagation();
    this.navbarFullService.setItemSelected(item);
  }

  onNewTabNavigate(item: NavbarFullItem, event: Event) {
    event.stopPropagation();

    if (item.onClick instanceof Function) {
      item.onClick(this);
    }
    const path = this.urlPath ? this.urlPath + item.path : item.path;
    const newWindow = window.open(path, '_blank');
    if (this.changeTabTitle) {
      newWindow.addEventListener('load', () => {
        newWindow.document.title = item.name;
      }, false);
    }
    this.navbarFullService.setItemSelected(null);
  }

  getNavbarGrid() {
    if (this.index === 0) {
      return 'alb-navbarfull-grid-' + this.columnsNumber.toString();
    }
  }

  onFavoriteClick(item: NavbarFullItem, event: Event) {
    event.stopPropagation();
    item.favorite = item.favorite !== null ? !item.favorite : false;
    this.navbarFullService.setItemFavoriteSelected(item);
  }
}
