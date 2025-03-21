import { autoserializeAs } from 'cerialize';
import { DateSerializer } from '../serialize/date-serializer';

export class ReprocessamentoEnvio {

  @autoserializeAs(DateSerializer, 'dat_ref_msg_tra')
  dataReferencia: Date;

  @autoserializeAs(Number, 'num_seq_msg_tra')
  numSequenciaTransacaoMensagem: number;

  @autoserializeAs(String, 'dsc_res_com_ope')
  composicaoOperacao: string;

  @autoserializeAs(String, 'id_eve_msg')
  evento: string;

  @autoserializeAs(Number, 'vr_fin_tra')
  valorFinanceiro: number;

  @autoserializeAs(DateSerializer, 'dat_mov')
  dataMovimento: Date;

  @autoserializeAs(Number, 'num_seq_tra')
  numeroSequenciaTransacao: number;

  constructor(obj) {
    Object.assign(this, obj);
  }

}
