import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ParametrosGlobaisService } from '../service/parametros-globais.service';
import { catchError } from 'rxjs/operators';
import { ParametrosGlobais } from './../model/parametros-globais';

@Injectable()
export class ParametrosGlobaisResolve implements Resolve<ParametrosGlobais> {
  constructor(
    private parametrosGlobaisService: ParametrosGlobaisService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ParametrosGlobais> {
    return this.parametrosGlobaisService.obterParametrosGlobais().pipe(catchError(error => {
      return of(null);
    }));
  }

}
