import { deserializeAs } from "cerialize";

export class PixNaoCreditadoFiltroTransacao {
    @deserializeAs(Number, 'numSeqTra')
    numSeqTra: number;
    @deserializeAs(String, 'dataRefTra')
    dataRefTra: string;
    constructor(obj) {
        Object.assign(this, obj);
      }
}