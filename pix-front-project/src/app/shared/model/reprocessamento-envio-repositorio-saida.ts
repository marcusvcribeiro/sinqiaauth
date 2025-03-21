import { serializeAs, deserializeAs } from 'cerialize';

export class MensagemEnvioRepositorioSaida {

  @serializeAs(String, 'dsc_res_com_ope')
  @deserializeAs(String, 'dsc_res_com_ope')
  composicaoOperacao: string;

  @serializeAs(String, 'cod_msg')
  @deserializeAs(String, 'cod_msg')
  codigo: string;

  @serializeAs(Number, 'vr_fin_tra')
  @deserializeAs(Number, 'vr_fin_tra')
  valorFinanceiro: number;

  @serializeAs(String, 'dat_ref_tra')
  @deserializeAs(String, 'dat_ref_tra')
  dataReferencia: Date;

  @serializeAs(String, 'dat_mov')
  @deserializeAs(String, 'dat_mov')
  agendamento: Date;

  @serializeAs(Number, 'num_seq_tra')
  @deserializeAs(Number, 'num_seq_tra')
  sequencial: number;


  constructor(obj) {
    Object.assign(this, obj);
  }
}
