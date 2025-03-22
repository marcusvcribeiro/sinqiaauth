import { deserializeAs, serializeAs } from 'cerialize';
import { DateSerializer } from '../serialize/date-serializer';

export { MensagemErroRecebimentoID, MensagemErroRecebimento };

class MensagemErroRecebimentoID {
  @serializeAs(Number, 'num_seq_msg')
  numeroSequencialMensagem: number;

  @serializeAs(String, 'dat_ref_msg')
  dataReferenciaMensagem: string;

  @serializeAs(Number, 'id_ent_par')
  idEntidadeParticipante: number;

  constructor(obj) {
    Object.assign(this, obj);
  }
}

class MensagemErroRecebimento {
  @deserializeAs(Number, 'num_seq_msg')
  numeroSequencialMensagem: number;

  @deserializeAs(String, 'dat_ref_msg')
  dataReferenciaMensagem: string;

  @deserializeAs(String, 'id_msg_rec')
  idMensagemRecebida: string;

  @deserializeAs(String, 'nom_enp_rec_msg')
  nomeEntidadeRecebedoraMensagem: string;

  @deserializeAs(Number, 'id_ent_par')
  idEntidadeParticipante: number;

  @deserializeAs(DateSerializer, 'dat_hor_inc')
  dataHoraInclusao: Date;

  @deserializeAs(String, 'sig_tip_emi_des')
  siglaTipoEmissorDestinatario: string;

  @deserializeAs(String, 'dsc_msg_ori')
  descricaoMensagem: string;
  
}
