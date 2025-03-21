import { deserializeAs } from 'cerialize';

export class HistoricoPesquisaComposicao {

  @deserializeAs('dat_ini')
  dataInicio: Date;

  @deserializeAs('dat_fim')
  dataFim: Date;

  @deserializeAs('id_sit_tra')
  sistema: number;
}
