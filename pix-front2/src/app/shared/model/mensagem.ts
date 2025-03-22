import { deserializeAs, serializeAs, autoserializeAs } from 'cerialize';

export class Mensagem {

  @autoserializeAs(String, 'cod_msg')
  codigoMensagem: string;

  @autoserializeAs(String, 'id_eve_msg')
  idEventoMensagem: string;

  @autoserializeAs(Number, 'id_tip_msg')
  idTipoMensagem: number;

  @autoserializeAs(String, 'dsc_lbl_msg')
  descricao: string;

  constructor(obj) {
    Object.assign(this, obj);
  }

}
