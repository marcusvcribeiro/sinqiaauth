import { serializeAs } from 'cerialize';
import { TransacaoID } from './transacao';

export class ConverteTransacao {

  @serializeAs('cod_sis_par')
  codigoSistema: number;

  @serializeAs('cod_prd_par')
  codigoProduto: number;

  @serializeAs('id_liq_par')
  idLiquidacao: number;

  @serializeAs('cod_ope_ban_par')
  codigoOperacaoBancaria: number;

  @serializeAs('num_com_ope')
  numeroComposicaoOperacao: number;

  @serializeAs('flg_man_ori')
  salvarTransacaoOriginal: boolean;

  @serializeAs('flg_inf_leg')
  informarLegado: boolean;

  @serializeAs('transacoes')
  transacoes: TransacaoID[];
}
