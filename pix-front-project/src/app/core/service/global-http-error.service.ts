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

  private getMessageError(error: HttpErrorResponse): Promise<string> {

    if(error.error instanceof Blob && error.error.type === 'application/json') {
      const reader = new FileReader();

      return new Promise((resolve, reject) => {

        reader.onload = () => {
          const errorObj = JSON.parse(reader.result as string);
          console.log(errorObj);
          resolve(errorObj.message);
        };
        reader.onerror = (err) => {
          console.log('Erro ao processar blob:', err);
          resolve(this.translateService.instant('alerta.erroInesperado'));
        };

        reader.readAsText(error.error);
      });
    }


    if (error.error) {

      if(error.error.message){
        return new Promise((resolve, reject) => resolve(error.error.message));
      }else if (Array.isArray(error.error)) {
        return new Promise((resolve, reject) => resolve(error.error[0].message));
      }else if(JSON.parse(error.error).message){
        return new Promise((resolve, reject) => resolve(JSON.parse(error.error).message));
      }
    }

    return new Promise((resolve, reject) => resolve(this.translateService.instant('alerta.erroInesperado')));
  }

  async handle(req: HttpRequest<any>, httpError: HttpErrorResponse): Promise<boolean> {
    let msgErro;
    let logout = false;

    switch (httpError.status) {
      case 400:
        msgErro = await this.getMessageError(httpError);
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
