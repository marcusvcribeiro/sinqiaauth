import { deserializeAs } from 'cerialize';
import { autoserializeAs } from 'cerialize';


export class SegParametro {

  dat_lgi: Date;
  timeout: number;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
