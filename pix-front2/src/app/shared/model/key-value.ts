export class KeyValue {
  id: number | string;
  descricao: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
