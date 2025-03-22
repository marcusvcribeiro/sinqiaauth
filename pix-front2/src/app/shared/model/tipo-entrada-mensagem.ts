import { deserializeAs } from 'cerialize';

export class TipoEntradaMensagem {

  @deserializeAs('id_tip_ent_msg')
  id: number;

  @deserializeAs('dsc_tip_ent_msg')
  descricao: string;
}
