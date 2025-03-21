import { Condicao } from './enum/condicao';
import { filter, IFilterCondition } from '../decorator/filter.decorator';
import { DebitoCredito } from './enum/debito-credito';

class PixNaoCreditadoConsultaFiltro implements IFilterCondition {
//filtro coluna
  @filter('DT_INCLUSAO', Condicao.IGUAL)
  dataInclusao;
  @filter('NUM_SEQUENCIAL', Condicao.IGUAL)
  numSequencial
  @filter('ID_EVE_MSG', Condicao.IGUAL)
  eveMsg
  @filter('ID_TIPO_COBRANCA', Condicao.IGUAL)
  idTipoCobranca
  @filter('SITUACAO', Condicao.IGUAL)
  situacaoMensagem
  @filter('INSTITUICAO', Condicao.IGUAL)
  instituicao
  @filter('ID_UNI_OPE', Condicao.IGUAL)
  idUniOpe
  @filter('VALOR', Condicao.IGUAL)
  valor
  @filter('DSC_CHV_END', Condicao.IGUAL)
  dscChvEnd
  @filter('NUM_SEQ_TRA', Condicao.IGUAL)
  numSeqTra
  @filter('DATA_REF_TRA', Condicao.IGUAL)
  dataRefTra
  
//filtro pesquisa
  @filter('ID_EVE_MSG', Condicao.CONTEM)
  idEveMsg: string;
  @filter('SITUACAO', Condicao.CONTEM)
  situacao: string;

  dataInicio: string;

  dataFim: string;

  conditions;

  constructor(obj) {
    Object.assign(this, obj);
  }
}

export { PixNaoCreditadoConsultaFiltro };
