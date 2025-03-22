import { NavigationComponent, NavigationItem, NavigationService } from '@albert/layout';
import { Directive, Host, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { UIMMenu } from './uim-menu';

@Directive({
  selector: '[albUIMNavigationProvider]'
})
export class UIMNavigationProviderDirective implements OnDestroy, OnInit {
  @Input() beforeNavigationLoad: (navigationItens: NavigationItem[]) => {};

  private unsubscribe$ = new Subject();

  constructor(
    private httpService: HttpService,
    private navigationService: NavigationService,
    @Host() private navigation: NavigationComponent) {
  }

  // override
  ngOnInit(): void {
    this.setMenus();
    // Metodo para atualizar favoritos no UI-Manager, mas precisa passar por varios testes antes
    // this.checkIfNavbarListChanged();
  }

  // override
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private checkIfNavbarListChanged() {
    this.navigationService.getNavbarList()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((list) => {
      const newList = this.createUIMMenuFromNavigation(list);
      this.httpService.put('menus', newList).subscribe();
    });
  }

  private createUIMMenuFromNavigation(list: NavigationItem[]): UIMMenu[] {
    if (!list) {
      return;
    }
    const menuList = [];
    for (const item of list) {
      const menu = this.createUIMMenuItem(item);
      menuList.push(menu);
      if (item.children) {
        menu.menus = this.createUIMMenuFromNavigation(item.children);
      }
    }
    return menuList;
  }

  private setMenus() {
    if (this.httpService.baseUrl) {
      this.httpService.find<UIMMenu[]>('menus').pipe(
        map(p => this.createNavigationFromMenu(p)),
        takeUntil(this.unsubscribe$))
        .subscribe(v => {
          if (this.beforeNavigationLoad && typeof this.beforeNavigationLoad === 'function') {
            this.beforeNavigationLoad(v);
          }
          this.navigation.items = v;
        });
    }
  }

  private createNavigationFromMenu(menusUiManager: UIMMenu[]): NavigationItem[] {
    const navigationItens = [];
    if (menusUiManager && menusUiManager.length > 0) {
      menusUiManager.sort((a, b) => a.ordem - b.ordem);
      for (const menu of menusUiManager) {
        const navigation = this.creatNavigationItem(menu);
        navigationItens.push(navigation);
        if (menu.menus) {
          navigation.children = this.createNavigationFromMenu(menu.menus);
        }
      }
    }
    return navigationItens;
  }

  private creatNavigationItem(menu: UIMMenu): NavigationItem {
    return {
      name: menu.nome,
      icon: menu.icone,
      path: menu.uri,
      type: menu.tipo ? menu.tipo : null,
      favorite: menu.favorito ? menu.favorito : false
    };
  }

  private createUIMMenuItem(item: NavigationItem): UIMMenu {
    return {
      nome: item.name,
      icone: item.icon,
      uri: item.path,
      tipo: item.type ? item.type : null,
      favorito: item.favorite ? item.favorite : false
    };
  }
}
