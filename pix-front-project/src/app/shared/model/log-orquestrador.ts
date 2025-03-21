import { deserializeAs, serializeAs } from 'cerialize';
import { IFilterCondition, filter } from '../decorator/filter.decorator';
import { Condicao } from './enum/condicao';
import { DateSerializer } from '../serialize/date-serializer';

export class LogOrquestrador implements IFilterCondition {

  @filter('DT_REFERENCIA', Condicao.PERIODO_DIA)
  @deserializeAs(DateSerializer, 'dat_ref_log_orq')
  dataReferencia : Date;

  @filter('DESC_ERRO', Condicao.CONTEM)
  @deserializeAs(String, 'dsc_err_log_orq')
  descricaoErro: String;

  @filter('E2EID', Condicao.CONTEM)
  @deserializeAs(String, 'id_uni_ope')
  idOperacao: String;

  @filter('TIPO_TRANSACAO', Condicao.IGUAL)
  @deserializeAs(Number, 'id_tip_tra_log_orq')
  idTipo : Number;

  @filter('NUM_SEQ', Condicao.CONTEM)
  @deserializeAs(Number, 'num_seq_log_orq')
  numeroSequencia: Number;

  
  constructor(obj) {
    Object.assign(this, obj);
  }

  conditions;
}
