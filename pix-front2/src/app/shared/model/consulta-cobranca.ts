export class ConsultaCobranca {
  txid? : string;
  rev?: number;
  dtCriacaoCob?: Date ;
  vlrOriginal?: number;
  situacao?: string;
  tokenAcesso?: string;
  dscTipCob?: string;
  integracaoCob?: string;
  flgApiPix?: string;
  chvEnd?: string;
  numCpfRec?:string;
  usuRec?: string;
  nomeRec?: string;
  numCpfDev?:string;
  nomeDev?: string;
  solPag?:string;
  dscCopiaCola?: string;
  cepRec?: string;
  constructor(obj) {
    Object.assign(this, obj);
  }
}

