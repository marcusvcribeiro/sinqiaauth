import { Injectable, OnDestroy } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnDestroy {

  private _isAuthenticated: boolean;
  private _userData: any;
  private unsubscribe$ = new Subject();

  constructor(
    private oidcSecurityService: OidcSecurityService
  ) {
    // chamando callback para quand o modulo de authentication esta setado
    if (this.oidcSecurityService.moduleSetup) {
      this.doCallbackLogicIfRequired();
    } else {
      this.oidcSecurityService.onModuleSetup
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.doCallbackLogicIfRequired();
        });
    }

    // atribuindo valor quando esta autorizado
    this.oidcSecurityService.getIsAuthorized()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(auth => {
        this._isAuthenticated = auth;
      });

    // atribuindo valores quando dados do usuario sao retornados
    this.oidcSecurityService.getUserData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(userData => {
        this._userData = userData;
      });
  }

  // override
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // metodo de login, antes de chamar o autorize precisa verificar se o modulo ja foi carregado.
  login() {
    if (this.oidcSecurityService.moduleSetup) {
      this.oidcSecurityService.authorize();
    } else {
      this.oidcSecurityService.onModuleSetup
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.oidcSecurityService.authorize();
        });
    }
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  get token() {
    return this.oidcSecurityService.getToken();
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  get userData() {
    return this._userData;
  }

  // callback para chamar authorizacao com code
  private doCallbackLogicIfRequired() {
    this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString());
  }
}
