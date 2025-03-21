import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthenticationConfig } from './authentication-config';

@Injectable({ providedIn: 'root' })
export class AuthenticationConfigService {

  private _config$ = new ReplaySubject(1);

  public get config() {
    return this._config$ as Observable<AuthenticationConfig>;
  }

  public setConfig(config: AuthenticationConfig) {
    this._config$.next(config);
  }
}
