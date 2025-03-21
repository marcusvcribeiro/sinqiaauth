import { deserializeAs } from 'cerialize';
import { DateSerializer } from '../serialize/date-serializer';

export class BoletagemTrilhaTransacao {
  @deserializeAs(DateSerializer, 'dat_hor_pro')
  data: Date;

  @deserializeAs(Boolean, 'flg_atu_res')
  atualizaReserva: boolean;

  @deserializeAs(String, 'dsc_est_tra')
  estadoTransacao: string;
}
