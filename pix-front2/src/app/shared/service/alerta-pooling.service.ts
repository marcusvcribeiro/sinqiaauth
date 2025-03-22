import { Injectable } from '@angular/core';
import { interval, merge, Observable, of } from 'rxjs';
import { exhaustMap, share, switchMap } from 'rxjs/operators';
import { AlertaService } from './alerta.service';
import { ParametrosGlobaisService } from './parametros-globais.service';
import { PreferenciaUsuarioService } from './preferencia-usuario.service';


@Injectable(
  { providedIn: 'root' }
)
export class AlertaPoolingService {

  // readonly
  private alertasNaoLidos$: Observable<number>;

  public get alertasNaoLidos(): Observable<number> {
    return this.alertasNaoLidos$;
  }

  constructor(private preferenciaUsuarioService: PreferenciaUsuarioService,
    private alertaService: AlertaService,
    private parametrosGlobaisService: ParametrosGlobaisService) {
    const dataReferencia = this.parametrosGlobaisService.dataReferencia;
    this.alertasNaoLidos$ = this.preferenciaUsuarioService.tempoAtualizacaoAlerta$.pipe(
      // Quando o intervalTime mudar, descarta o interval anterior
      switchMap(x => merge(of(0), interval(x * 1000))),
      exhaustMap(_ => this.alertaService.obterQuantidadeAlertasNaoLidos(dataReferencia)),
      share()
    );
  }

}
