
import { OperacaoEnum } from 'src/app/seg/enum/operacaoEnum';


export class DonoChave {
  idUsuRec: number;
  chvEnd: string;
  idDono: string;
  tipoDono: number;
  nome: string;
  operacao: OperacaoEnum;
  cep: string;
  logradouro: string;
  cidade: string;
  estado: string;
}