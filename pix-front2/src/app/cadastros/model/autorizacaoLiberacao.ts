import { deserializeAs, serializeAs } from "cerialize";

export class AutorizacaoLiberacao{
  @deserializeAs(Number, 'cod_emp_par')
  @serializeAs(Number, 'cod_emp_par')
  codEmpPar: number;

  @deserializeAs(Number, 'cod_sis_par')
  @serializeAs(Number, 'cod_sis_par')
  codSisPar: number;

  @deserializeAs(Number, 'cod_prd_par')
  @serializeAs(Number, 'cod_prd_par')
  codPrdPar: number;

  @deserializeAs(Number, 'cod_ope_ban_par')
  @serializeAs(Number, 'cod_ope_ban_par')
  codOpeBanPar: number;

  @deserializeAs(Number, 'id_liq_par')
  @serializeAs(Number, 'id_liq_par')
  idLiqPar: number;

  @deserializeAs(Number, 'num_com_ope')
  @serializeAs(Number, 'num_com_ope')
  numComOpe: number;

  @deserializeAs(Number, 'num_seq_aut_lib_ope')
  @serializeAs(Number, 'num_seq_aut_lib_ope')
  numSeqAutLibOpe: number;

  @deserializeAs(Number, 'cod_niv_hie')
  @serializeAs(Number, 'cod_niv_hie')
  codNivHie: number;

  @deserializeAs(Number, 'vr_lim_aut')
  @serializeAs(Number, 'vr_lim_aut')
  vrLimAut: number;

  @deserializeAs(Number, 'qtd_aut')
  @serializeAs(Number, 'qtd_aut')
  qtdAut: number;

  @deserializeAs(Number, 'cod_usu_ult_mnt')
  @serializeAs(Number, 'cod_usu_ult_mnt')
  codUsuUltMnt: number;

  @deserializeAs(Date, 'dat_ult_mnt')
  @serializeAs(Date, 'dat_ult_mnt')
  datUltMnt: Date | string;
}
