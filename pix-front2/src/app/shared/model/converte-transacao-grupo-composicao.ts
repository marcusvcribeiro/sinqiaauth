import { deserializeAs } from 'cerialize';


class ConverteTransacaoGrupoComposicao {
  @deserializeAs(Number, 'id_liq_par')
  idLiquidacao: number;

  @deserializeAs(Number, 'id_grp_com_ope')
  idGrupo: number;

  @deserializeAs(String, 'id_eve_msg')
  idEvento: string;

  @deserializeAs(Number, 'cod_ope_ban_par')
  codigoOperacaoBancaria: number;

  @deserializeAs(Number, 'cod_prd_par')
  codigoProduto: number;

  @deserializeAs(Number, 'cod_sis_par')
  codigoSistema: number;

  @deserializeAs(String, 'dsc_liq_par')
  liquidacao: string;

  @deserializeAs(Number, 'num_com_ope')
  numeroComposicaoOperacao: number;

  @deserializeAs(String, 'dsc_res_com_ope')
  composicaoOperacao: string;

  @deserializeAs(String, 'dsc_prd_par')
  produto: string;

  @deserializeAs(String, 'dsc_sis_par')
  sistema: string;

  @deserializeAs(String, 'dsc_ope_ban_par')
  operacaoBancaria: string;
}

class ConverteTransacaoGrupo {
  @deserializeAs(Number, 'dsc_grp_com_ope')
  descricao: string;

  @deserializeAs(Number, 'id_grp_com_ope')
  id: string;

  @deserializeAs(ConverteTransacaoGrupoComposicao, 'Composicoes')
  composicoes: ConverteTransacaoGrupoComposicao[];
}

export { ConverteTransacaoGrupoComposicao, ConverteTransacaoGrupo };

