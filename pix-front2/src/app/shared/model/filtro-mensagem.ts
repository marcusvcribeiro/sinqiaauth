import { deserializeAs, serializeAs, autoserializeAs } from 'cerialize';
import { BoletoTipoCampo } from './enum/boleto-tipo-campo';

export class FiltroMensagem {
  operador: String;

  @autoserializeAs(String, 'id_tag')
  idCampo: string;

  @autoserializeAs(String, 'dsc_lbl_tag')
  descricao: String;

  @deserializeAs(BoletoTipoCampo, 'id_tip_cam')
  tipoCampo: BoletoTipoCampo;

  constructor(obj) {
    Object.assign(this, obj);
  }

}
