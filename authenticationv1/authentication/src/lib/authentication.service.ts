import { Injectable, OnDestroy } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Subject, timer } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnDestroy {

  private _isAuthenticated: boolean;
  private _userData: any;
  private unsubscribe$ = new Subject();
  private tokenRenewalTimer: any;

  constructor(
    private oidcSecurityService: OidcSecurityService
  ) {
    this.setupAuthenticationListeners();
  }

  private setupAuthenticationListeners() {
    if (this.oidcSecurityService.moduleSetup) {
      this.doCallbackLogicIfRequired();
    } else {
      this.oidcSecurityService.onModuleSetup
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.doCallbackLogicIfRequired();
        });
    }

    this.oidcSecurityService.getIsAuthorized()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(auth => auth !== undefined)
      )
      .subscribe(auth => {
        this._isAuthenticated = auth;
        if (auth) {
          this.setupTokenRenewal();
        }
      });

    this.oidcSecurityService.getUserData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(userData => {
        this._userData = userData;
      });
  }

  private setupTokenRenewal() {
    if (this.tokenRenewalTimer) {
      clearInterval(this.tokenRenewalTimer);
    }

    // Renovar o token a cada 4 minutos (240000 ms)
    this.tokenRenewalTimer = setInterval(() => {
      if (this._isAuthenticated) {
        this.oidcSecurityService.refreshSession().subscribe(
          () => {
            console.debug('Token renovado com sucesso');
          },
          error => {
            console.error('Erro ao renovar token:', error);
            if (error.status === 401 || error.status === 403) {
              this.logout();
            }
          }
        );
      }
    }, 240000);
  }

  ngOnDestroy(): void {
    if (this.tokenRenewalTimer) {
      clearInterval(this.tokenRenewalTimer);
    }
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

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
    if (this.tokenRenewalTimer) {
      clearInterval(this.tokenRenewalTimer);
    }
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

  private doCallbackLogicIfRequired() {
    // Verifica se estamos em uma URL de callback
    if (window.location.href.indexOf('code=') > -1) {
      this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString());
    }
  }
}
