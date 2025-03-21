import { serializeAs } from 'cerialize';

export class MensagemErroFormatacaoID {
  @serializeAs(Number, 'num_seq_tra')
  numeroSenquenciaTransacao: number;

  @serializeAs(String, 'dat_ref_tra')
  dataReferenciaTransacao: Date;

  constructor(obj) {
    Object.assign(this, obj);
  }

}
