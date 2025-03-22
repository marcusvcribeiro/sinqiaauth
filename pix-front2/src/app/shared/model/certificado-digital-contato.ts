import { OperacaoEnum } from 'src/app/seg/enum/operacaoEnum';

export class CertificadoDigitalContato {

  id: number;
  nome: string;
  email: string;
  operacao: OperacaoEnum;

  constructor(nome: string, email: string, operacao: OperacaoEnum) {
    this.nome = nome;
    this.email = email;
    this.operacao = operacao;
  }

}