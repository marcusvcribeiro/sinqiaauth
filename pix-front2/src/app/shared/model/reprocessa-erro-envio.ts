import { autoserializeAs } from 'cerialize';

export class MensagemEnvio {

  @autoserializeAs(String, 'dat_ref_msg_tra')
  dataReferencia: Date;

  @autoserializeAs(Number, 'num_seq_msg_tra')
  numSequenciaTransacaoMensagem: number;

  constructor(obj) {
    Object.assign(this, obj);
  }

}
