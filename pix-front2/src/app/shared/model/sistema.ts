import { deserializeAs } from 'cerialize';

export class Sistema {

  @deserializeAs(Number, 'id_sis')
  id: number;

  @deserializeAs(String, 'dsc_sis')
  descricao: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
