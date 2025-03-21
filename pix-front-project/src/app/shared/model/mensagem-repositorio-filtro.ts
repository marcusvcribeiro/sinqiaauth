import { Condicao } from './enum/condicao';
import { filter, IFilterCondition } from '../decorator/filter.decorator';

export class MensagemRepositorioFiltro implements IFilterCondition {

  @filter('DT_PROCESSAMENTO', Condicao.IGUAL)
  dataProcessamento: Date | string;

  @filter('DT_PROCESSAMENTO', Condicao.MAIOR_IGUAL)
  deProcessamento: Date | string;

  @filter('DT_PROCESSAMENTO', Condicao.MENOR_IGUAL)
  ateProcessamento: Date | string;

  @filter('DT_INCUSAO', Condicao.IGUAL)
  dataInclusao: Date | string;

  @filter('DT_INCUSAO', Condicao.MAIOR_IGUAL)
  deInclusao: Date | string;

  @filter('DT_INCUSAO', Condicao.MENOR_IGUAL)
  ateInclusao: Date | string;

  @filter('DT_AGENDAMENTO', Condicao.MENOR_IGUAL)
  dataAgendamento: Date | string;

  @filter('DT_AGENDAMENTO', Condicao.MAIOR_IGUAL)
  deAgendamento: Date | string;

  @filter('DT_AGENDAMENTO', Condicao.MENOR_IGUAL)
  ateAgendamento: Date | string;

  @filter('SITUACAO', Condicao.IGUAL)
  situacao: string;

  @filter('CHAVE_LEGADO', Condicao.IGUAL)
  chaveLegado: string;

  @filter('ARQUIVO_ENTRADA', Condicao.IGUAL)
  arquivoEntrada: string;

  @filter('LAYOUT_INTEGRACAO', Condicao.IGUAL)
  layoutIntegracao: string;

  @filter('SISTEMA', Condicao.IGUAL)
  sistema: string;

  dataReferencia: Date | string;

  conditions;

  constructor(obj) {
    Object.assign(this, obj);
  }

}
