import { deserializeAs } from 'cerialize';

export class PixNaoCreditadoReenvio {

  @deserializeAs(String, 'listProcessId')
  listProcessId: string[];

  constructor() {
    this.listProcessId = [];
  }

}
