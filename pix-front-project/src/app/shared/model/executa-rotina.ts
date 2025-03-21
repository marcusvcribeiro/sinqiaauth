import { serializeAs } from 'cerialize';
import { TransacaoID } from './transacao';

export class ExecutaRotina {

  @serializeAs('id_rot')
  idRotina: string | number;

  @serializeAs('transacoes')
  transacoes: TransacaoID[];

  constructor(obj) {
    Object.assign(this, obj);
  }
}
