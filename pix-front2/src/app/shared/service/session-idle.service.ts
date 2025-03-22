import { Injectable } from '@angular/core';
import { ParametrosGlobaisService } from './parametros-globais.service';

@Injectable({
  providedIn: 'root'
})
export class SessionIdleService {

  timeoutTracker: any;

  constructor() { }

  updateExpiredTime(timeout: number) {
    if (this.timeoutTracker) {
      clearTimeout(this.timeoutTracker);
    }
    this.timeoutTracker = setTimeout(() => {
      localStorage.setItem('_expiredTime', (Date.now() + timeout * 1000).toString());
    }, 150);
  }

  get ExpiredTime() {
    const value = localStorage.getItem('_expiredTime');
    return parseInt(value, 10) < Date.now();
  }
}
