import { filter, IFilterCondition } from '../decorator/filter.decorator';
import { Condicao } from 'src/app/shared/model/enum/condicao';

export class MensagemRepositorioSaidaFiltro implements IFilterCondition {
  @filter('DT_INCUSAO', Condicao.IGUAL)
  dataInclusao: Date | string;

  @filter('DT_INCUSAO', Condicao.MAIOR_IGUAL)
  deInclusao: Date | string;

  @filter('DT_INCUSAO', Condicao.MENOR_IGUAL)
  ateInclusao: Date | string;

  @filter('DT_PROCESSAMENTO', Condicao.IGUAL)
  dataProcessamento: Date | string;

  @filter('DT_PROCESSAMENTO', Condicao.MAIOR_IGUAL)
  deProcessamento: Date | string;

  @filter('DT_PROCESSAMENTO', Condicao.MENOR_IGUAL)
  ateProcessamento: Date | string;

  @filter('SITUACAO', Condicao.IGUAL)
  situacao: string;

  @filter('CHAVE_LEGADO', Condicao.IGUAL)
  chaveLegado: string;

  @filter('CHAVE_SPI', Condicao.IGUAL)
  chaveSPI: string;

  @filter('SISTEMA', Condicao.IGUAL)
  sistema: string;

  @filter('MENSAGEM', Condicao.IGUAL)
  codigoMensagem: string;

  @filter('DT_REF_TRANSACAO', Condicao.IGUAL)
  dataReferenciaTransacao: Date | string;

  @filter('NUM_SEQ_TRANSACAO', Condicao.IGUAL)
  numeroSequencialTransacao: number;

  @filter('ARQUIVO_SAIDA', Condicao.IGUAL)
  arquivoSaida: string;

  dataReferencia: Date | string;

  conditions;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
