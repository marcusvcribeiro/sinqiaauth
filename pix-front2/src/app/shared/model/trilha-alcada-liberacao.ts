import { deserializeAs } from 'cerialize';

export class BoletagemTrilhaAlcadaLiberacao {

  @deserializeAs(String, 'dat_hor_lib')
  dataHoraLiberacao: string;

  @deserializeAs(String, 'nom_usu')
  usuario: string;

  @deserializeAs(Number, 'vr_niv_hie')
  nivelHierarquico: number;
}
