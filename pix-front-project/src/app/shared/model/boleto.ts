import { autoserializeAs, deserializeAs, serializeAs } from 'cerialize';
import { DateSerializer } from '../serialize/date-serializer';
import { BoletoClassificacaoCampo } from './enum/boleto-classificacao-campo';
import { BoletoTipoCampo } from './enum/boleto-tipo-campo';


export class DominioTag {
  @serializeAs(String, 'vr_dom_tag')
  @deserializeAs(String, 'vr_dom_tag')
  id: string;

  @serializeAs(String, 'dsc_dom_tag')
  @deserializeAs(String, 'dsc_dom_tag')
  descricao: string;
}

export class AtributoTag {
  @serializeAs(String, 'nom_atr')
  @deserializeAs(String, 'nom_atr')
  nome: string;

  @serializeAs(String, 'vr_atr')
  @deserializeAs(String, 'vr_atr')
  valor: string;
}

export class BoletoTag {
  @serializeAs(String, 'id_tag')
  @deserializeAs(String, 'id_tag')
  id: string;

  @serializeAs(String, 'id_tag_pai')
  @deserializeAs(String, 'id_tag_pai')
  tagPai: string;

  @serializeAs(Boolean, 'flg_tag_obr_bol')
  @deserializeAs(Boolean, 'flg_tag_obr_bol')
  campoObrigatorio: boolean;

  @serializeAs(Number, 'num_ord_tag_msg')
  @deserializeAs(Number, 'num_ord_tag_msg')
  ordemCampo: number;

  @serializeAs(String, 'dsc_lbl_tag')
  @deserializeAs(String, 'dsc_lbl_tag')
  labelCampo: string;

  @serializeAs(BoletoTipoCampo, 'id_tip_cam')
  @deserializeAs(BoletoTipoCampo, 'id_tip_cam')
  tipoCampo: BoletoTipoCampo;

  @serializeAs(BoletoClassificacaoCampo, 'id_cla_tip_tag')
  @deserializeAs(BoletoClassificacaoCampo, 'id_cla_tip_tag')
  classificacaoCampo: BoletoClassificacaoCampo;

  @serializeAs(Number, 'qtd_min_car_tip_tag')
  @deserializeAs(Number, 'qtd_min_car_tip_tag')
  qtdMinimaCaracter: number;

  @serializeAs(Number, 'qtd_car_tip_tag')
  @deserializeAs(Number, 'qtd_car_tip_tag')
  qtdMaximaCaracter: number;

  @serializeAs(Number, 'qtd_dec_tip_tag')
  @deserializeAs(Number, 'qtd_dec_tip_tag')
  qtdCasasDecimais: number;

  @serializeAs(String, 'vlr_tag')
  @deserializeAs(String, 'vlr_tag')
  valorTag: string;

  @serializeAs(Number, 'id_tip_tag')
  @deserializeAs(Number, 'id_tip_tag')
  tipoTag: number;

  @serializeAs(DominioTag, 'dom_tag')
  @deserializeAs(DominioTag, 'dom_tag')
  dominioTags: DominioTag[];

  @serializeAs(AtributoTag, 'tip_tag_atr')
  @deserializeAs(AtributoTag, 'tip_tag_atr')
  atributoTags: AtributoTag[];

  @serializeAs(Boolean, 'tag_red_oly')
  @deserializeAs(Boolean, 'tag_red_oly')
  tagReadonly: Boolean;


  @serializeAs(Number, 'id_mas')
  @deserializeAs(Number, 'id_mas')
  idMascara: number;

  @serializeAs(String, 'dsc_mas')
  @deserializeAs(String, 'dsc_mas')
  dscMascara: string;

  hash;

  constructor(obj) {
    Object.assign(this, obj);
  }
}

export class BoletoGrupo {
  @autoserializeAs(String, 'id_tag')
  id: string;

  @autoserializeAs(Boolean, 'flg_tag_rti')
  tagRepetindo: boolean;

  @autoserializeAs(String, 'dsc_lbl_tag')
  label: string;

  @autoserializeAs(Number, 'num_ord_tag_msg')
  ordem: number;

  @autoserializeAs(Boolean, 'flg_tag_obr_bol')
  campoObrigatorio: boolean;

  @autoserializeAs(BoletoTag, 'tags')
  tags: BoletoTag[];

  @autoserializeAs(BoletoGrupo, 'grupos')
  grupos: BoletoGrupo[];

  hash;

  constructor(obj) {
    Object.assign(this, obj);
  }
}

export class BoletoPayload {
  constructor(obj) {
    Object.assign(this, obj);
  }

  @serializeAs(String, 'dat_mov')
  dataMovimento: string;

  @serializeAs(String, 'nom_mdl_msg')
  nomeModeloMensagem: string;

  @serializeAs(Number, 'id_cnl_trs_msg')
  idCanalMensagem: number;

  @serializeAs(Number, 'id_sit_tra')
  idSituacaoTransacao: number;

  @serializeAs(String, 'cod_sis_par')
  codigoSistema: string;

  @serializeAs(Number, 'cod_prd_par')
  codigoProduto: number;

  @serializeAs(Number, 'id_tip_msg')
  idTipoMensagem: number;

  @serializeAs(Number, 'cod_ope_ban_par')
  codigoOperacaoBancaria: number;

  @serializeAs(Number, 'id_liq_par')
  idLiquidacao: number;

  @serializeAs(String, 'cod_msg')
  codigoMensagem: string;

  @serializeAs(Number, 'num_com_ope')
  idComprovanteOperacao: number;

  @serializeAs(DateSerializer, 'dat_ref_tra')
  dataReferencia: Date;

  @serializeAs(Number, 'num_seq_tra')
  numeroSequenciaTransacao: number;

  @serializeAs(BoletoGrupo, 'estrutura')
  estrutura: BoletoGrupo;
}

export class BoletoConsulta {

  idMensagem: string;

  idTipoMensagem: number;

  codigoSistemaParticipante: string;

  codigoOperacaoBancariaParticipante: number;

  numeroOperacao: string;

  leitura: boolean;

  constructor(obj, leitura) {
    Object.assign(this, obj);
    this.leitura = leitura;
  }

}
