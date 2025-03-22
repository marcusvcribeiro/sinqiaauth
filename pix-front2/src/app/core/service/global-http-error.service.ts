import { HttpErrorResponse, HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionIdleService } from './../../shared/service/session-idle.service';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
@Injectable()
export class GlobalHttpErrorService implements HttpInterceptor {

  constructor(
    private translateService: TranslateService,
    private pixMessageService: PixMessageService,
    private sessionIdleService: SessionIdleService,
    private parametrosGlobaisService: ParametrosGlobaisService,
    private router: Router,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(req => {
        this.sessionIdleService.updateExpiredTime(this.parametrosGlobaisService.timeout);
        return req;
      }),
      catchError((err: HttpErrorResponse) => {
        this.handle(req, err);
        return throwError(err);
      }));
  }

  handle(req: HttpRequest<any>, httpError: HttpErrorResponse): boolean {
    let msgErro;
    let logout = false;

    switch (httpError.status) {
      case 400:
        msgErro = httpError.error.message;
        logout = false;
        break;
        case 401:
        case 403:
            setTimeout(() => {
               this.router.navigate(['auth/logout']);
            }, 4000);
        break;
      case 0: // connection refused
      case 404:
        msgErro = this.translateService.instant('alerta.servidorIndisponivel');
         // logout = true;
        break;
      case 500:
        msgErro = httpError.error.message;
        msgErro = this.translateService.instant('alerta.servidorIndisponivel');
        logout = false;
        break;
      default:
        msgErro = this.translateService.instant('alerta.erroInesperado');
        logout = false;
        break;
    }


    // Só exibe a mensagem se não foi explicitado para esconde-la
    const catchErrors = !req.headers.keys().includes('catchErrors');
    const details = httpError.error ? httpError.error.details : undefined;

    if (msgErro && catchErrors) {
      if (logout) {
        // this.messageService.msgErro(msgErro, () => {
        //   this.authService.logout();
        //   return false;
        // }, details);
      } else {
        this.pixMessageService.toastErro(msgErro);
      }
    }

    return true;
  }
}
