import { serializeAs } from 'cerialize';

class LiberarBoletoChave {

  @serializeAs('dat_ref_tra')
  dataReferencia: Date | string;

  @serializeAs('num_seq_tra')
  numeroSequenciaTransacao: number;

  @serializeAs('id_eve_msg')
  idMensagem: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}

class LiberarBoleto {
  serialVersionUID: number;

  @serializeAs('boletos')
  liberarBoleto: LiberarBoletoChave[];

  constructor(obj) {
    Object.assign(this, obj);
  }

  setLiberarBoletoChave(values: LiberarBoletoChave[]) {
    const array: LiberarBoletoChave[] = [];
    values.forEach(element => {
      array.push(new LiberarBoletoChave(element));
    });
    this.liberarBoleto = array;
  }
}

export { LiberarBoleto, LiberarBoletoChave };

