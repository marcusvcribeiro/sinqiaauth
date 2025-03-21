import { deserializeAs, serializeAs } from "cerialize";

export class AssociacaoAlcadaGrupoUsuario{
  @deserializeAs(Number, 'id_grp_usu')
  @serializeAs(Number, 'id_grp_usu')
  idGrpUsu: number;

  @deserializeAs('dsc_grp_usu')
  @serializeAs('dsc_grp_usu')
  dscGrpUsu:string;

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

  @deserializeAs(Number, 'id_aca_alc_ope')
  @serializeAs(Number, 'id_aca_alc_ope')
  idAcaAlcOpe: number;

  @deserializeAs(Number, 'vr_lim_ope')
  @serializeAs(Number, 'vr_lim_ope')
  vrLimOpe: number;

  @deserializeAs(Number, 'cod_usu_ult_mnt')
  @serializeAs(Number, 'cod_usu_ult_mnt')
  codUsuUltMnt: number;

  @deserializeAs('dat_ult_mnt')
  @serializeAs('dat_ult_mnt')
  datUltMnt: Date | string;
}
