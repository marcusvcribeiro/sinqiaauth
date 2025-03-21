import { deserializeAs } from 'cerialize';
import { DateSerializer } from '../serialize/date-serializer';

export class BoletagemTrilhaAlcadaLiberacao {

  @deserializeAs(DateSerializer, 'dat_hor_lib')
  dataHoraLiberacao: Date;

  @deserializeAs(String, 'nom_usu')
  usuario: string;

  @deserializeAs(Number, 'vr_niv_hie')
  nivelHierarquico: number;
}
