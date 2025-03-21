import { deserializeAs } from 'cerialize';

export class HistoricoComposicao {

  @deserializeAs(String, 'cod_msg')
  codigoMensagem: string;

  @deserializeAs(Number, 'cod_ope_ban_par')
  operacaoBancaria: number;

  @deserializeAs(Number, 'cod_prod_par')
  produto: number;

  @deserializeAs(Number, 'cod_sis_par')
  sistema: number;

  @deserializeAs(String, 'dsc_lbl_msg')
  descricaoLblMensagem: string;

  @deserializeAs(String, 'dsc_liq_apar')
  descricaoLiquidacaoMensagem: string;

  @deserializeAs(String, 'dsc_ope_ban_par')
  descricaoOperacaoBancariaMensagem: string;

  @deserializeAs(String, 'dsc_prod_par')
  descricaoProduto: string;

  @deserializeAs(String, 'dsc_sis_par')
  descricaoSistema: string;

  @deserializeAs(String, 'id_liq_par')
  liquidacao: number;

  @deserializeAs(String, 'id_tip_msg')
  tipoMensagem: number;
}
