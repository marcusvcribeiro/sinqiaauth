import { deserializeAs, serializeAs } from "cerialize";

export class GrupoAlarme {

  @deserializeAs(Number, 'cod_emp_par')
  @serializeAs(Number, 'cod_emp_par')
  codEmpPar: number;

  @deserializeAs(Number, 'id_grp_usu')
  @serializeAs(Number, 'id_grp_usu')
  idGrpUsu: number;

  @deserializeAs('dsc_tip_ala')
  @serializeAs('dsc_tip_ala')
  dscTipAla: string;

  @deserializeAs('dsc_tip_env_ala')
  @serializeAs('dsc_tip_env_ala')
  dscTipEnvAla: string;

  @deserializeAs('dsc_epe_ala')
  @serializeAs('dsc_epe_ala')
  dscEpeAla: string;

  @deserializeAs('dsc_ala')
  @serializeAs('dsc_ala')
  dscAla: string;

  @deserializeAs('dsc_msg_ala')
  @serializeAs('dsc_msg_ala')
  dscMsgAla: string;

  @deserializeAs(Number, 'cod_usu_ult_mnt')
  @serializeAs(Number, 'cod_usu_ult_mnt')
  codUsuUltMnt: number;

  @deserializeAs(Date, 'dat_ult_mnt')
  @serializeAs('dat_ult_mnt')
  datUltMnt: Date | string;

}
