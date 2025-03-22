import { OperacaoEnum } from 'src/app/seg/enum/operacaoEnum';

export class ContatoUsuarioRecebedor {
  id: number;
  nome: string;
  email: string;
  operacao: OperacaoEnum;

  selecionado: boolean;
  idUsurec: number;
  clientId: string;

  constructor(nome: string, email: string, operacao: OperacaoEnum) {
    this.nome = nome;
    this.email = email;
    this.operacao = operacao;
  }
}