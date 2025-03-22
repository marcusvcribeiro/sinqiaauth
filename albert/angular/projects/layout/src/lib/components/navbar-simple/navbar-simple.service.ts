import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NavbarSimpleItem } from './navbar-simple';

@Injectable()
export class NavbarSimpleService {
  itemClicked$ = new Subject<any>();
  private itemFavoriteSelected$: Subject<NavbarSimpleItem> = new Subject();

  setItemClicked(item: any) {
    this.itemClicked$.next(item);
  }

  getItemClicked() {
    return this.itemClicked$.asObservable();
  }

  setItemFavoriteSelected(item: NavbarSimpleItem) {
    this.itemFavoriteSelected$.next(item);
  }

  getItemFavoriteSelected(): Observable<NavbarSimpleItem> {
    return this.itemFavoriteSelected$.asObservable();
  }
}
