import { NavigationItem } from '@albert/layout';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/service/http-client.service';
import { Observable } from 'rxjs';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { Menu } from 'src/app/shared/model/menu';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private httpClienteService: HttpClientService) { }

  getMenus(): Observable<NavigationItem[]> {
    return this.httpClienteService.seg.find<NavigationItem[]>({ path: 'menus' });
  }
}
