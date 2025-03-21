import { deserializeAs } from 'cerialize';

export class EstadoTransacao {

  @deserializeAs('id_est_tra')
  id: number;

  @deserializeAs('dsc_est_tra')
  descricao: string;
}
