import { deserializeAs } from 'cerialize';

export class BoletagemTrilhaAlcadaReserva {

  @deserializeAs('dat_hor_lib')
  dataHoraLiberacao: string;

  @deserializeAs('nom_usu')
  usuario: string;

  @deserializeAs('vr_niv_hie')
  nivelHierarquico: number;
}
