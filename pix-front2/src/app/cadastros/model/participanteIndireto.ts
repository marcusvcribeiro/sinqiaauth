import { deserializeAs, serializeAs } from "cerialize";

export class ParticipanteIndireto {
  @deserializeAs(Number, 'id_ent_par')
  @serializeAs(Number, 'id_ent_par')
  idEntPar: number;

  @deserializeAs(String, 'id_est_ope')
  @serializeAs(String, 'id_est_ope')
  idEstOpe: string;

  @deserializeAs(Date, 'dat_ini_ope')
  @serializeAs('dat_ini_ope')
  datIniOpe: Date | string;

  @deserializeAs(Number, 'cod_sis_par')
  @serializeAs(Number, 'cod_sis_par')
  codSisPar: number;

  @deserializeAs(String, 'nom_ent_par')
  @serializeAs(String, 'nom_ent_par')
  nomEntPar: string;

  @deserializeAs(String, 'dsc_sis_par')
  @serializeAs(String, 'dsc_sis_par')
  dscSisPar: string;
}



