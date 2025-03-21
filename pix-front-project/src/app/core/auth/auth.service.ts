import { Injectable, OnDestroy } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private readonly TOKEN_RENEWAL_INTERVAL = 240000; // 4 minutos
  private readonly SESSION_CHECK_INTERVAL = 30000; // 30 segundos
  private readonly ACTIVITY_TIMEOUT = 900000; // 15 minutos

  private unsubscribe$ = new Subject<void>();
  private tokenRenewalTimer: any;
  private sessionCheckTimer: any;
  private lastActivity: number = Date.now();
  private _isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router: Router
  ) {
    this.setupAuthenticationListeners();
    this.startActivityMonitoring();
  }

  private setupAuthenticationListeners() {
    if (this.oidcSecurityService.moduleSetup) {
      this.handleAuthenticationCallback();
    } else {
      this.oidcSecurityService.onModuleSetup
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.handleAuthenticationCallback();
        });
    }

    this.oidcSecurityService.getIsAuthorized()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(auth => auth !== undefined)
      )
      .subscribe(isAuthorized => {
        this._isAuthenticated.next(isAuthorized);
        if (isAuthorized) {
          this.setupTokenRenewal();
          this.setupSessionCheck();
        }
      });
  }

  private startActivityMonitoring() {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, () => this.updateLastActivity());
    });
  }

  private updateLastActivity() {
    this.lastActivity = Date.now();
  }

  private setupTokenRenewal() {
    if (this.tokenRenewalTimer) {
      clearInterval(this.tokenRenewalTimer);
    }

    this.tokenRenewalTimer = setInterval(() => {
      if (this._isAuthenticated.value) {
        this.oidcSecurityService.refreshSession().subscribe(
          () => console.debug('Token renovado com sucesso'),
          error => {
            console.error('Erro ao renovar token:', error);
            if (error.status === 401 || error.status === 403) {
              this.logout();
            }
          }
        );
      }
    }, this.TOKEN_RENEWAL_INTERVAL);
  }

  private setupSessionCheck() {
    if (this.sessionCheckTimer) {
      clearInterval(this.sessionCheckTimer);
    }

    this.sessionCheckTimer = setInterval(() => {
      const inactiveTime = Date.now() - this.lastActivity;
      if (inactiveTime >= this.ACTIVITY_TIMEOUT) {
        console.warn('Sessão expirada por inatividade');
        this.logout();
      }
    }, this.SESSION_CHECK_INTERVAL);
  }

  private handleAuthenticationCallback() {
    if (window.location.href.indexOf('code=') > -1) {
      this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString())
        .subscribe(
          () => {
            const returnUrl = localStorage.getItem('returnUrl') || '/';
            this.router.navigateByUrl(returnUrl);
            localStorage.removeItem('returnUrl');
          },
          error => {
            console.error('Erro na autenticação:', error);
            this.router.navigate(['/auth/login']);
          }
        );
    }
  }

  login(returnUrl: string = '/') {
    localStorage.setItem('returnUrl', returnUrl);
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
    if (this.sessionCheckTimer) {
      clearInterval(this.sessionCheckTimer);
    }
    this._isAuthenticated.next(false);
    this.oidcSecurityService.logoff();
  }

  get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated.value;
  }

  get token(): string {
    return this.oidcSecurityService.getToken();
  }

  get userData(): any {
    return this.oidcSecurityService.getUserData();
  }

  ngOnDestroy() {
    if (this.tokenRenewalTimer) {
      clearInterval(this.tokenRenewalTimer);
    }
    if (this.sessionCheckTimer) {
      clearInterval(this.sessionCheckTimer);
    }
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}