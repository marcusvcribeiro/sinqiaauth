import { deserializeAs } from 'cerialize';

export class SistemaParticipante {

  @deserializeAs(Number, 'cod_sis_par')
  id: number;

  @deserializeAs(String, 'dsc_sis_par')
  descricao: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
