import { Injectable } from '@angular/core';
import { merge, Observable, of } from 'rxjs';
import { exhaustMap, map, share } from 'rxjs/operators';
import { DashboardRefreshService } from 'src/app/dashboard/service/dashboard-refresh.service';
import { DateFormatHelper } from 'src/app/shared/helper/date-format-helper';
import { DetalheReserva } from 'src/app/shared/model/detalhe-reserva';
import { FormulaCampo } from 'src/app/shared/model/formula-campo';
import { PosicaoReserva } from 'src/app/shared/model/posicao-reserva';
import { HttpClientService } from 'src/app/shared/service/http-client.service';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';

@Injectable({
  providedIn: 'root'
})
export class AcompanhamentoReservaService {

  private dataReferencia: Date;
  private dataReferenciaDashboard: Date;
  private posicaoReserva$: Observable<Map<string, PosicaoReserva>>;
  private subscribers = 0;

  get posicaoReserva(): Observable<Map<string, PosicaoReserva>> {
    return this.posicaoReserva$;
  }

  constructor(private httpClientService: HttpClientService,
    private parametroService: ParametrosGlobaisService,
    private dashboardRefreshService: DashboardRefreshService
  ) {
    this.dataReferencia = this.parametroService.dataReferencia;    
  }

  obterFormulaCampo(nom_cam_vr: string): Observable<FormulaCampo> {
    const path = `conta-pi/detalhe-campo/formula/${nom_cam_vr}`;
    return this.httpClientService.pix.find({ path: path });
  }

  obterDetalheCampo(identificadorDoCampo: string, dataReferencia: Date): Observable<DetalheReserva[]> {
    const path = `conta-pi/detalhe-campo/data/${identificadorDoCampo}/${DateFormatHelper.toUrlDate(dataReferencia)}`;
    return this.httpClientService.pix.find<DetalheReserva[]>({ path: path, responseType: DetalheReserva });
  }

  listarPosicaoReservaDia(): Observable<PosicaoReserva[]> {
    const data = DateFormatHelper.toUrlDate(this.parametroService.dataReferenciaDashboard ?  this.parametroService.dataReferenciaDashboard : this.dataReferencia);
    return this.httpClientService.pix.find({
      path: `conta-pi/acompanhamento/${data}`, responseType: PosicaoReserva
    });
  }

  // TODO: Falta API para verificar mensagem
  verificarMensagem(descricaoMotivo: string) {
  }

  adicionarDashboardRefresh() {
    this.subscribers++;
    if (!this.posicaoReserva$) {
      this.setPosicaoReserva();
    }
    this.dashboardRefreshService.showDashboardRefresh();
  }

  removerDashboardRefresh() {
    if (--this.subscribers <= 0) {
      this.dashboardRefreshService.hideDashboardRefresh();
    }
  }

  private setPosicaoReserva() {
    this.posicaoReserva$ = merge(of(true), this.dashboardRefreshService.refresh$).pipe(

      // Realiza a consulta somente se acabou a anterior
      exhaustMap(_ => this.listarPosicaoReservaDia()),

      // Transforma em map para facilitar consumo
      map(posicoes => {
        const m = new Map<string, PosicaoReserva>();
        posicoes.forEach(item => m.set(item.campo, item));
        return m;
      }),

      // Compartilha observable
      share()
    );
  }
}
