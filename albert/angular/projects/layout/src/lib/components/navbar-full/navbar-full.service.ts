import { Injectable } from '@angular/core';
import { Subject, Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { NavigationItem } from '../navigation/navigation';
import { NavbarFullItem } from './navbar-full';

@Injectable()
export class NavbarFullService {
  /**
   * Váriaveis utilizadas como store, para comunicar com os componentes internos do Navbar
   */
  private itemFavoriteSelected$: Subject<NavbarFullItem> = new Subject();
  private itemSelected$: Subject<NavbarFullItem> = new Subject();
  private itemSelectedAside$: Subject<NavbarFullItem> = new BehaviorSubject(null);

  setItemSelected(item: NavbarFullItem) {
    this.itemSelected$.next(item);
  }

  getItemSelected(): Observable<NavbarFullItem> {
    return this.itemSelected$.asObservable();
  }

  setItemSelectedAside(item: NavbarFullItem) {
    this.itemSelectedAside$.next(item);
  }

  getItemSelectedAside(): Observable<NavbarFullItem> {
    return this.itemSelectedAside$.asObservable();
  }

  setItemFavoriteSelected(item: NavbarFullItem) {
    this.itemFavoriteSelected$.next(item);
  }

  getItemFavoriteSelected(): Observable<NavbarFullItem> {
    return this.itemFavoriteSelected$.asObservable();
  }

  /**
   * Filtra toda a árvore de lista do NavbarFullItem de acordo com o Range
   * @param items - Lista de items do Navbar
   * @param range - Quantidade de level da árvore de items a ser filtrada
   */
  filterOffsetAside(items: NavbarFullItem[], range: number): NavbarFullItem[] {
    const result = (itemsResult: NavbarFullItem[], rangeResult: number) => {
      return itemsResult.map((item: NavbarFullItem) => {
        if (item.children && item.children.length && rangeResult < range) {
          return { ...item, children: result(item.children, (rangeResult + 1)) };
        } else {
          return { ...item, children: [] };
        }
      });
    };

    return result(items, 1);
  }

  /**
   * Cria um novo array dos items encontrado de acordo com o nome passado como parámetro
   * @param items - Lista de items do Navbar
   * @param name - Nome do NavbarItem
   */
  findLinks(items: NavbarFullItem[], name: string): NavbarFullItem[] {
    let result = [];

    const find = (itemsFind) => {
      itemsFind.forEach((item: NavbarFullItem) => {
        if (item.name === name && item.children) {
          result = [...item.children];
        } else if (item.children && item.children.length) {
          find(item.children);
        }
      });
    };

    find(items);

    return result;
  }

  /**
   * Cria um novo array dos items encontrado de acordo com o id passado como parámetro
   * @param items - Lista de items do Navbar
   * @param id - Id do NavbarItem
   */
  findIdLinks(items: NavbarFullItem[], id: string): NavbarFullItem[] {
    let result = [];

    const find = (itemsFind) => {
      itemsFind.forEach((item: NavbarFullItem) => {
        if (item.id === id && item.children) {
          result = [...item.children];
        } else if (item.children && item.children.length) {
          find(item.children);
        }
      });
    };

    find(items);

    return result;
  }
}
