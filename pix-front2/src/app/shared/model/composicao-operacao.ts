import { deserializeAs, serializeAs } from 'cerialize';

export class ComposicaoOperacao {

  @deserializeAs(String, 'cod_sis_par')
  codigoSistemaParticipante: string;

  @deserializeAs(Number, 'cod_prd_par')
  produto: number;

  @deserializeAs(Number, 'cod_ope_ban_par')
  codigoOperacaoBancariaParticipante: number;

  @deserializeAs(Number, 'id_liq_par')
  liquidacao: number;

  @deserializeAs(Number, 'num_com_ope')
  numeroOperacao: number;

  @deserializeAs(Number, 'id_tip_msg')
  idTipoMensagem: number;

  @deserializeAs(String, 'id_eve_msg')
  idMensagem: string;

  @deserializeAs(String, 'dsc_sis_par')
  descricaoSistema: string;

  @deserializeAs(String, 'dsc_prd_par')
  descricaoProduto: string;

  @deserializeAs(String, 'dsc_ope_ban_par')
  descricaoOperacaoBancaria: string;

  @deserializeAs(String, 'dsc_liq_par')
  descricaoLiquidacao: string;

  @deserializeAs(String, 'id_tag_msg')
  tagMensagem: string;

  @deserializeAs(Number, 'cod_emp_par')
  codEmpPar: number;

  @deserializeAs(String, 'dsc_res_com_ope')
  descricaoResumida: string;

  @deserializeAs(String, 'dsc_lbl_msg')
  descricaoLblMensagem: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}

export class TipoOperacao {

  @deserializeAs(Number, 'cod_ope_ban_par')
  id: number;

  @deserializeAs(String, 'dsc_ope_ban_par')
  descricao: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}

export class Sistema {

  @deserializeAs(Number, 'cod_sis_par')
  id: number;

  @deserializeAs(String, 'dsc_sis_par')
  descricao: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}

export class SistemaInterno {

  @deserializeAs(Number, 'id_sis')
  id: number;

  @deserializeAs(String, 'dsc_sis')
  descricao: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}

export class Produto {

  @deserializeAs(Number, 'cod_prd_par')
  id: number;

  @deserializeAs(String, 'dsc_prd_par')
  descricao: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}

export class Liquidacao {

  @deserializeAs(Number, 'id_liq_par')
  id: number;

  @deserializeAs(String, 'dsc_liq_par')
  descricao: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}

export class Pesquisa {

  @serializeAs('cod_sis_par')
  sistema?: number;

  @serializeAs('cod_prd_par')
  produto?: number;

  @serializeAs('id_liq_par')
  liquidacao?: number;

  @serializeAs('cod_ope_ban_par')
  operacaoBancaria?: number;

  @serializeAs('id_tip_msg')
  tipoMensagem?: number;

  @serializeAs('cod_msg')
  mensagem?: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
