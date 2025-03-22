import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../shared/service/http-client.service';
import { TreeNode } from 'primeng/api';
import { DateFormatHelper } from 'src/app/shared/helper/date-format-helper';
import { MensagemTarifadaGrupoDTO } from 'src/app/shared/model/mensagem-tarifada-grupo';
import { MensagemTarifadaItemDTO } from 'src/app/shared/model/mensagem-tarifada-item';
import { ListResultCore } from 'src/app/shared/model/list-result';
import { MensagemTarifadaFiltroDTO } from 'src/app/shared/model/mensagem-tarifada-filtro';

@Injectable()
export class ConciliacaoMensagemService {

  constructor(private httpClientService: HttpClientService) { }

  obterGrupoMensagenTarifada(dataInicio: Date, dataFim: Date): Observable<MensagemTarifadaGrupoDTO> {
    const dataInicioFormatada = DateFormatHelper.toUrlDate(dataInicio);
    const dataFimFormatada = DateFormatHelper.toUrlDate(dataFim);

    const path = `mensagem/tarifada/grupos/${dataInicioFormatada}/${dataFimFormatada}`;

    return this.httpClientService.core.post({ path });
  }

  listarItemMensagenTarifada(dataInicio: Date, dataFim: Date,
    filtro: MensagemTarifadaFiltroDTO): Observable<ListResultCore<MensagemTarifadaItemDTO>> {
    const dataInicioFormatada = DateFormatHelper.toUrlDate(dataInicio);
    const dataFimFormatada = DateFormatHelper.toUrlDate(dataFim);

    const path = `mensagem/tarifada/itens/${dataInicioFormatada}/${dataFimFormatada}`;
    const body: any = filtro;

    return this.httpClientService.core.post<ListResultCore<MensagemTarifadaItemDTO>>({ path, body });
  }
}
