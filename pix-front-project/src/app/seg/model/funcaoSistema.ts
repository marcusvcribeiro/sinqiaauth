import * as moment from "moment";
import { Moment } from "moment";
import { OperacaoSeg } from "./operacao.enum";

export class FuncaoSistema {
  id: number;
  nome: string;
  idTxt : string;
  codUsuUltMnt : number;
  datUltMnt: Moment;
  idNum: number;
  operacao: OperacaoSeg
}
