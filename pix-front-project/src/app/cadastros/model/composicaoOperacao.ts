import { deserializeAs, serializeAs } from "cerialize";

export class ComposicaoOperacao{
  @deserializeAs(Number, 'cod_emp_par')
  @serializeAs(Number, 'cod_emp_par')
  codEmpPar: number;

  @deserializeAs('id_eve_msg')
  @serializeAs('id_eve_msg')
  idMensagem: string;

  @deserializeAs(Number, 'cod_ope_ban_par')
  @serializeAs(Number, 'cod_ope_ban_par')
  codigoOperacaoBancariaParticipante: number;

  @deserializeAs(Number, 'cod_sis_par')
  @serializeAs(Number, 'cod_sis_par')
  codigoSistemaParticipante: number;

  @deserializeAs('dsc_lbl_msg')
  @serializeAs('dsc_lbl_msg')
  descricaoLblMensagem: string;

  @deserializeAs('dsc_liq_par')
  @serializeAs('dsc_liq_par')
  descricaoLiquidacao: string;

  @deserializeAs('dsc_ope_ban_par')
  @serializeAs('dsc_ope_ban_par')
  descricaoOperacaoBancaria: string;

  @deserializeAs('dsc_prd_par')
  @serializeAs('dsc_prd_par')
  descricaoProduto: string;

  @deserializeAs('dsc_res_com_ope')
  @serializeAs('dsc_res_com_ope')
  descricaoResumida: string;

  @deserializeAs('dsc_sis_par')
  @serializeAs('dsc_sis_par')
  descricaoSistema: string;

  @deserializeAs('id_tip_msg')
  @serializeAs('id_tip_msg')
  idTipoMensagem: string;

  @deserializeAs(Number, 'id_liq_par')
  @serializeAs(Number, 'id_liq_par')
  liquidacao: number;

  @deserializeAs(Number, 'num_com_ope')
  @serializeAs(Number, 'num_com_ope')
  numeroOperacao: number;

  @deserializeAs(Number, 'cod_prd_par')
  @serializeAs(Number, 'cod_prd_par')
  produto: number;

  @deserializeAs(Number, 'id_tag_msg')
  @serializeAs(Number, 'id_tag_msg')
  tagMensagem: string;

  @deserializeAs(Number, 'num_seq_aut_lib_ope')
  @serializeAs(Number, 'num_seq_aut_lib_ope')
  numSeqAutLibOpe: number;
}
