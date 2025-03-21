import { deserializeAs, serializeAs } from "cerialize";

export class GrupoAlcada {

  @deserializeAs(Number, 'cod_emp_par')
  @serializeAs(Number, 'cod_emp_par')
  codEmpPar: number;

  @deserializeAs(Number, 'id_grp_usu')
  @serializeAs(Number, 'id_grp_usu')
  idGrpUsu: number;

  @deserializeAs(Number, 'id_aca_alc_ope')
  @serializeAs(Number, 'id_aca_alc_ope')
  idAcaAlcOpe: number;

  @deserializeAs('dsc_com_ope')
  @serializeAs('dsc_com_ope')
  dscComOpe: string;

  @deserializeAs('id_eve_msg')
  @serializeAs('id_eve_msg')
  idEveMsg: string;

  @deserializeAs(Number, 'vr_lim_ope')
  @serializeAs(Number, 'vr_lim_ope')
  vrLimOpe: number;

  @deserializeAs('dsc_aca_alc_ope')
  @serializeAs('dsc_aca_alc_ope')
  dscAcaAlcOpe: string;

  @deserializeAs(Number, 'cod_usu_ult_mnt')
  @serializeAs(Number, 'cod_usu_ult_mnt')
  codUsuUltMnt: number;

  @deserializeAs(Date, 'dat_ult_mnt')
  @serializeAs('dat_ult_mnt')
  datUltMnt: Date | string;

}
