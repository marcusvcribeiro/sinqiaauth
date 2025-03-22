import { Injectable } from '@angular/core';
import { AuthenticationService } from '@albert/authentication';
import { BehaviorSubject, Observable, throwError, timer } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject<any>(null);
  private readonly REFRESH_INTERVAL = 4 * 60 * 1000; // 4 minutos

  constructor(private authService: AuthenticationService) {
    this.setupAutoRefresh();
  }

  private setupAutoRefresh() {
    timer(this.REFRESH_INTERVAL, this.REFRESH_INTERVAL)
      .pipe(
        filter(() => this.authService.isAuthenticated)
      )
      .subscribe(() => {
        this.refreshToken().subscribe();
      });
  }

  refreshToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        this.refreshTokenSubject
          .pipe(
            filter(result => result !== null),
            take(1)
          )
          .subscribe(
            result => {
              observer.next(result);
              observer.complete();
            },
            error => {
              observer.error(error);
            }
          );
      });
    }

    this.refreshTokenInProgress = true;
    this.refreshTokenSubject.next(null);

    return this.authService.oidcSecurityService.refreshSession().pipe(
      switchMap(response => {
        this.refreshTokenInProgress = false;
        this.refreshTokenSubject.next(response);
        return this.refreshTokenSubject.asObservable();
      }),
      catchError(error => {
        this.refreshTokenInProgress = false;
        this.refreshTokenSubject.next(null);
        if (error.status === 401 || error.status === 403) {
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }

  getToken(): string {
    return this.authService.token;
  }
}