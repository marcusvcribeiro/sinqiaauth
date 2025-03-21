import { deserializeAs, serializeAs } from 'cerialize';
import { IFilterCondition, filter } from '../decorator/filter.decorator';
import { Condicao } from './enum/condicao';
import { DateSerializer } from '../serialize/date-serializer';

export class LogOcorrencia implements IFilterCondition {

  @filter('DT_INCLUSAO', Condicao.PERIODO_DIA)
  @deserializeAs(DateSerializer, 'dat_inc_log_oco')
  dataInclusao: Date;

  @deserializeAs(DateSerializer, 'dat_ref_log_oco')
  dataReferencia: Date;

  @filter('OCORRENCIA', Condicao.CONTEM)
  @deserializeAs(String, 'dsc_oco')
  ocorrencia: String;

  @filter('SISTEMA', Condicao.CONTEM)
  @deserializeAs(String, 'dsc_sis')
  sistema: String;

  @filter('TIPO_OCORRENCIA', Condicao.IGUAL)
  @deserializeAs(Number, 'id_tip_oco')
  tipoOcorrencia: Number;

  @filter('NUM_SEQ', Condicao.CONTEM)
  @deserializeAs(Number, 'num_seq_log_oco')
  numeroSequencia: Number;

  @deserializeAs(String, 'dsc_log_oco')
  descricaoLog: String;

  @deserializeAs(DateSerializer, 'dat_ref_msg_tra')
  dataReferenciaMensagem: Date;

  @deserializeAs(Number, 'num_seq_tra')
  numSequenciaTransacao: Number;

  @deserializeAs(Number, 'num_seq_msg_tra')
  numSequenciaTransacaoMensagem: Number;

  @deserializeAs(String, 'id_eve_msg')
  codigoMensagem: String;

  @deserializeAs(DateSerializer, 'dat_ref_ent_leg')
  dataReferenciaRepositorioEntrada: Date;

  @deserializeAs(Number, 'num_seq_ent_leg')
  numSequenciaRepositorioEntrada: Number;

  @deserializeAs(DateSerializer, 'dat_ref_sai_leg')
  dataReferenciaRepositorioSaida: Date;

  @deserializeAs(Number, 'num_seq_sai_leg')
  numSequenciaRepositorioSaida: Number;

  constructor(obj) {
    Object.assign(this, obj);
  }

  conditions;
}
