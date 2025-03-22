import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { NavigationItem } from '../navigation/navigation';

@Injectable()
export class NavigationService {
  /**
   * Váriaveis utilizadas como store, para comunicar com os componentes internos do Navbar
   */
  private navbarList$: Subject<NavigationItem[]> = new BehaviorSubject(null);

  setNavbarList(item: NavigationItem[]) {
    this.navbarList$.next(item);
  }

  getNavbarList(): Observable<NavigationItem[]> {
    return this.navbarList$.asObservable();
  }

}
