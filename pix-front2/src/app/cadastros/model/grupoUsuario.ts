import { deserializeAs, serializeAs } from "cerialize";

export class GrupoUsuario {
  @deserializeAs(Number, 'id_grp_usu')
  @serializeAs(Number, 'id_grp_usu')
  idGrpUsu: number;

  @deserializeAs(Number, 'cod_niv_hie')
  @serializeAs(Number, 'cod_niv_hie')
  codNivHie: number;

  @deserializeAs('dsc_grp_usu')
  @serializeAs('dsc_grp_usu')
  dscGrpUsu: string;

  @deserializeAs(Date, 'dat_ult_mnt')
  @serializeAs('dat_ult_mnt')
  datUltMnt: Date | string;

  @deserializeAs('cod_sit_ope')
  @serializeAs('cod_sit_ope')
  codSitOpe: string;

  @deserializeAs('flg_pem_csu_irr')
  @serializeAs('flg_pem_csu_irr')
  flgPemCsuIrr: string;

  @deserializeAs(Number, 'cod_usu_ult_mnt')
  @serializeAs(Number, 'cod_usu_ult_mnt')
  codUsuUltMnt: number;

  @deserializeAs('dsc_fun_grp_usu')
  @serializeAs('dsc_fun_grp_usu')
  dscFunGrpUsu: string;
}



