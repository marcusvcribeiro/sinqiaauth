import { OperacaoSeg } from './operacao.enum';
import { Moment } from "moment";

export class Grupo {
  id: string;
  nome: string;
  descricao: string;
  operacao: OperacaoSeg;
  qtdDiaExpSen: number;
  tipCarSen: string;
  tamMinSen: number;
  tamMaxSen: number;
  numCacIguCcu: number;
  qtdMaxAltSenDia: number;
  qtdMinSenCcu: number;
  qtdMinCacLet: number;
  qtdMinLetMau: number;
  qtdMinLetMiu: number;
  qtdMinCacEsp: number;
  qtdMinCacNum: number;
  qtdDiaSemAceSis: number;
  qtdTtvIvlPem: number;
  utzDioSenFra: boolean;
}
