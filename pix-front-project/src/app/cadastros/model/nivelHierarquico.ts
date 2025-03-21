import { deserializeAs, serializeAs } from "cerialize";

export class NivelHierarquico {
  @deserializeAs(Number, 'cod_niv_hie')
  @serializeAs(Number, 'cod_niv_hie')
  codNivHie: number;

  @deserializeAs(Number, 'vr_niv_hie')
  @serializeAs(Number, 'vr_niv_hie')
  vrNivHie: number;

  @deserializeAs(String, 'dat_ult_mnt')
  @serializeAs(String, 'dat_ult_mnt')
  datUltMnt: Date | string;

  @deserializeAs(Number, 'cod_usu_ult_mnt')
  @serializeAs(Number, 'cod_usu_ult_mnt')
  codUsuUltMnt: number;
}



