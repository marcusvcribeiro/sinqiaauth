import { deserializeAs } from 'cerialize';

export class BoletagemAlcadaGestaoReserva {
  @deserializeAs('nom_usu')
  usuario: string;
}
