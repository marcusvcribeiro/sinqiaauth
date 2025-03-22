import { Injectable, OnDestroy } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnDestroy {

  private _isAuthenticated = true;
  private _userData: any;
  private unsubscribe$ = new Subject();
  isAuthenticated$: Observable<boolean>;

  constructor(
    private oidcSecurityService: OidcSecurityService
  ) {
    this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;
    this.oidcSecurityService.checkAuth().subscribe((isAuthenticated) =>
      {
        console.log('app authenticated', isAuthenticated);
        this._isAuthenticated = true;
      }
    );
  }

  // override
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  login() {
    this.oidcSecurityService.authorize();
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

  // // callback para chamar authorizacao com code
  // private doCallbackLogicIfRequired() {
  //   this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString());
  // }
}
