import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  // interceptando requisições para setar token de autenticação
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestToForward = req;
    const token = this.authenticationService.token;
    if (!!token) {
      const tokenValue = 'Bearer ' + token;
      requestToForward = req.clone({ setHeaders: { Authorization: tokenValue } });
    } else {
      // tslint:disable-next-line
      console.debug('OidcSecurityService undefined: NO auth header!');
    }
    return next.handle(requestToForward);
  }
}
