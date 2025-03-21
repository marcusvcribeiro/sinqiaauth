import { deserializeAs } from 'cerialize';

export class BoletagemTrilhaAlcadaReserva {

  @deserializeAs('dat_hor_lib')
  dataHoraLiberacao: Date;

  @deserializeAs('nom_usu')
  usuario: string;

  @deserializeAs('vr_niv_hie')
  nivelHierarquico: number;
}
