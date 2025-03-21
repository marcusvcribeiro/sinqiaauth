export class ConsultaCobrancaFilter {
  txid? : string;
  revisao?: number;
  tokenAcesso?: Date ;
  constructor(obj) {
    Object.assign(this, obj);
  }
}

