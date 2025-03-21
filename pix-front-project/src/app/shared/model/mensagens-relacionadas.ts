import { serializeAs, deserializeAs, autoserializeAs } from 'cerialize';
import { DateSerializer } from '../serialize/date-serializer';

class BoletagemMensagensRelacionadas {

  @deserializeAs(DateSerializer, 'dat_ref_tra')
  dataReferencia: Date;

  @deserializeAs(Number, 'num_seq_tra')
  numeroSequenciaTransacao: number;

  @deserializeAs(String, 'dsc_est_tra')
  descricaoEstadoTransacao: string;

  @deserializeAs(String, 'dsc_sit_msg')
  descricaoSituacaoMensagem: string;

  @deserializeAs(String, 'id_eve_msg')
  codigoMensagem: string;

  @deserializeAs(DateSerializer, 'dat_inc')
  dataInclusao: Date;

  @autoserializeAs(String, 'cod_msg')
  idMensagem: string;

  @autoserializeAs(String, 'dat_mov')
  dataMovimento: string;

  @autoserializeAs(Number, 'vr_fin_tra')
  valorFinanceiro: number;

  @autoserializeAs(String, 'dsc_prd_par')
  produto: string;

  @autoserializeAs(String, 'dsc_ope_ban_par')
  operacaoBancaria: string;

  @deserializeAs(String, 'dsc_res_com_ope')
  composicaoOperacao: string;

  @deserializeAs(Number, 'id_tip_msg')
  idTipoMensagem: number;

  @deserializeAs(String, 'cod_sis_par')
  codigoSistemaParticipante: string;

  @deserializeAs(String, 'cod_ope_ban_par')
  codigoOperacaoBancariaParticipante: number;

  @deserializeAs(String, 'num_com_ope')
  numeroOperacao: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}


class BoletagemMensagensRelacionadasQueryParams {

  @serializeAs('num_ctrl_msg')
  numControleMensagem: string;

  @serializeAs('num_ctrl_msg_ori')
  numControleMensagemOrigem: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}

class TransacaoMensagensRelacionadasFiltro {

  @serializeAs('data')
  dataReferencia: Date;

  @serializeAs('seq')
  numeroSequenciaTransacao: number;

  @serializeAs('numCtrlMsg')
  numeroUnicoOperacao?: string;

  @serializeAs('numCtrlMsgOri')
  numeroUnicoOperacaoOriginal?: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}

export { BoletagemMensagensRelacionadas, BoletagemMensagensRelacionadasQueryParams, TransacaoMensagensRelacionadasFiltro };
