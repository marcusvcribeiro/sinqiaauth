import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { ParametrosGlobais } from '../model/parametros-globais';
import { SegParametro } from '../model/seg-parametro';
import { HttpClientService } from './http-client.service';
import { interval, zip } from 'rxjs';
import { SessionIdleService } from './session-idle.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { AuthenticationService } from '@albert/authentication';
import { ParametrosGerais } from '../model/parametros-gerais';

@Injectable({
  providedIn: 'root'
})
export class ParametrosGlobaisService {
  dataReferenciaDashboard: Date;
  private _parametrosGlobais: ParametrosGlobais;
  //#region properties
  get dataReferencia(): Date {
    return this._parametrosGlobais.dataReferencia;
  }

  get timeout(): number {
    return this._parametrosGlobais.timeout;
  }

  get dataUltimoLogin(): Date {
    return this._parametrosGlobais.dataUltimoLogin;
  }

  get controleSessao(): boolean{
    return this._parametrosGlobais.flagControleSessao;
  }
  //#endregion

  constructor(
    private httpClientService: HttpClientService,
    private sessionIdle: SessionIdleService,
    private authenticationService: AuthenticationService,
    private translateService: TranslateService,
    private pixMessageService: PixMessageService,
  ) {
    this._parametrosGlobais = new ParametrosGlobais();
   }

  obterParametrosGlobais(): Observable<ParametrosGlobais> {
    return zip(
      this.httpClientService.pix.find({ path: 'parametro/sistema', responseType: ParametrosGlobais }),
      this.httpClientService.seg.find({ path: 'segparametro' }),
      this.httpClientService.core.find({path: 'parametros'}),
    ).pipe(map((values: any) => {
      const param_sistema = values[0] as ParametrosGlobais;
      const param_seg = values[1] as SegParametro;
      const param_gerais = values[2] as ParametrosGerais;

      param_sistema.flagControleSessao = param_gerais.flagControleSessao;
      param_sistema.timeout = param_seg.timeout;
      param_sistema.dataUltimoLogin = param_seg.dat_lgi;
      this._parametrosGlobais = param_sistema;

         
      this.sessionIdle.updateExpiredTime(param_seg.timeout);
      this.verificarSessionIdle();

      return param_sistema;
    }));
  }

  private verificarSessionIdle() {
    let msgErro = this.translateService.instant('alerta.sessaoExpirada');
    timer(5000)
      .subscribe(() => {
        if (this.sessionIdle.ExpiredTime) {
          this.pixMessageService.toastErro(msgErro);
          setTimeout(()=>{
            this.authenticationService.logout();
          },4000);
        } else {
          this.verificarSessionIdle();
        }
      });
  }
}
