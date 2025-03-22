import { deserializeAs } from 'cerialize';

export class BoletagemTrilhaTransacao {
  @deserializeAs(String, 'dat_hor_pro')
  data: string;

  @deserializeAs(Boolean, 'flg_atu_res')
  atualizaReserva: boolean;

  @deserializeAs(String, 'dsc_est_tra')
  estadoTransacao: string;
}
