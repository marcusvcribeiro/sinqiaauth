import * as moment from "moment";

export class ConsultaCobrancaFiltro {
  txid?: string;
  revisao?: number;
  dataInicio?: Date | string
  dataFim?: Date | string
  idSituacaoCobranca?: number;
  idTipoCobranca?: number;
  idFlgApiPix?: string;
  idIntCob?: string;
  chave?:string;
  idCpfCnpjRec?:string;
  idCpfCnpjDev?:string;
  idVlrOriginalMaior?:string;
  idVlrOriginalMenor?:string;
  dtCriacaoCob?: Date | string;
  vlrOriginal?: string;
  tokenAcesso: string;
  chvEnd: string;
  usuRec: string;
  nomeRec: string;
  nomeDev: string;
  solPag: string;
  cepRec:string;
}
