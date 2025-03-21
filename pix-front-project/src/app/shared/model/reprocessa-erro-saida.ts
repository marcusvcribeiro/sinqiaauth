import { autoserializeAs } from 'cerialize';

export class MensagemSaida {
  @autoserializeAs(String, 'dat_ref_ent_leg')
  dataReferenciaRepositorioSaida: Date;

  @autoserializeAs(Number, 'num_seq_ent_leg')
  numSequenciaRepositorioSaida: number;

  constructor(obj) {
    Object.assign(this, obj);
  }

}
