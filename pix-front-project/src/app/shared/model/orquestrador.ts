import { deserializeAs } from 'cerialize';

export class Orquestrador {

  @deserializeAs(String, 'url')
  url: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
