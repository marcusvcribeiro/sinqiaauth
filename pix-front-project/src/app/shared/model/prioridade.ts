import { serializeAs } from 'cerialize';
import { TransacaoID } from './transacao';

export class Prioridade {

  @serializeAs('id_tip_prr')
  idTipoPrioridade: number;

  @serializeAs('transacoes')
  transacoes: TransacaoID[];

  constructor(obj) {
    Object.assign(this, obj);
  }
}
