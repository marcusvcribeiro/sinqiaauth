import { autoserializeAs, deserialize, deserializeAs } from 'cerialize';


export class DominioPrioridade {

  @deserializeAs('id_tip_prr')
  idPrioridade: number;

  @deserializeAs('dsc_tip_prr')
  descricao: String;

  constructor(obj) {
    Object.assign(this, obj);
  }

}
