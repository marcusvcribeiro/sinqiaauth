import { deserializeAs } from 'cerialize';

export class EscoposUsuarioRecebedor {
  @deserializeAs(Number, 'id')
  id: number;
  @deserializeAs(Number, 'name')
  name: string;
  @deserializeAs(Number, 'selecionado')
  selecionado: boolean;

  constructor(id: number, name: string, selecionado: boolean) {
    this.id = id;
    this.name = name;
    this.selecionado = selecionado;
  }
}