import { Moment } from "moment";
import { OperacaoEnum } from "../enum/operacaoEnum";
import { OperacaoSeg } from "./operacao.enum";

export class Usuario {
  id: number;
  nome: string;
  login: string;
  situacao: string;
  email: string;
  operacao: OperacaoSeg;
  resetarSenha: boolean;
  autenticacao: boolean;
  statusAutenticacao:string;
}
