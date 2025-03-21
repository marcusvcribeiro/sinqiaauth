import { autoserializeAs, deserializeAs } from 'cerialize';
import { DateSerializer } from '../serialize/date-serializer';
import { DebitoCredito } from './enum/debito-credito';

export class ConsultaTransacaoManual {
  @deserializeAs(String, 'nom_mdl_msg')
  nomeModeloMensagem: string;

  @deserializeAs(Number, 'num_seq_tra')
  numeroSequenciaTransacao: number;

  @deserializeAs(String, 'dsc_est_tra')
  estadoTransacao: string;

  @deserializeAs(String, 'dsc_sit_msg')
  situacaoMensagem: string;

  @deserializeAs(String, 'cod_age')
  agencia: string;

  @deserializeAs(String, 'num_cta')
  conta: string;

  @deserializeAs(String, 'cod_msg')
  codigoMensagem: string;

  @deserializeAs(DateSerializer, 'dat_inc')
  dataInclusao: Date;

  @deserializeAs(DateSerializer, 'dat_mov')
  dataMovimento: Date;

  @deserializeAs(Number, 'vr_fin_tra')
  valorFinanceiro: number;

  @deserializeAs(String, 'dsc_res_com_ope')
  composicaoOperacao: string;

  @deserializeAs(String, 'dsc_ope_ban_par')
  operacaoBancaria: string;

  @deserializeAs(String, 'dsc_sis_par')
  sistema: string;

  @deserializeAs(String, 'nom_usu')
  usuarioUltimaManutencao: string;

  @deserializeAs(String, 'nom_usu_inc')
  usuarioInclusao: string;

  @deserializeAs(Number, 'qtd_aut')
  qtdAutorizacao: number;

  @autoserializeAs(DateSerializer, 'dat_ref_tra')
  dataReferencia: Date;

  @deserializeAs(String, 'dsc_tip_prr')
  prioridade: string;

  @deserializeAs(String, 'id_uni_ope')
  numeroUnicoOperacao: string;

  @deserializeAs(String, 'id_uni_ope_ori')
  numeroUnicoOperacaoOriginal: string;

  @deserializeAs(String, 'id_tip_ent_msg')
  tipoEntradaMensagem: string;

  @autoserializeAs(DateSerializer, 'dat_ult_pro_emi')
  dataUltimoProcessamentoEmissor: Date;

  @deserializeAs(String, 'num_ctr_if')
  numeroControleIF: string;

  @deserializeAs(String, 'id_trn_cob')
  idTransacaoCob: string;

  @deserializeAs(String, 'id_eve_msg')
  idMensagem: string;

  @deserializeAs(Number, 'id_tip_msg')
  idTipoMensagem: number;

  @deserializeAs(String, 'id_deb_cre')
  debitoCredito: DebitoCredito;

  @deserializeAs(String, 'cod_sis_par')
  codigoSistemaParticipante: string;

  @deserializeAs(String, 'cod_ope_ban_par')
  codigoOperacaoBancariaParticipante: number;

  @deserializeAs(String, 'num_com_ope')
  numeroOperacao: string;

  @deserializeAs(Number, 'id_liq_par')
  liquidacao: number;

  @deserializeAs(Number, 'cod_prd_par')
  produto: number;

  @autoserializeAs(DateSerializer, 'dat_ult_mnt')
  dataUltimaManutencao: Date;

  @autoserializeAs(Number, 'id_sit_env_msg')
  idSistemaEnvioMensagem: number;

  @autoserializeAs(Number, 'id_cnl_trs_msg')
  idCanalMensagem: number;

  @autoserializeAs(String, 'nom_usu_dbl')
  nomeUsuarioDesbloqueio: string;
  
  @autoserializeAs(String, 'num_cpf_cnpj_pag')
  cpfCnpjPagador: string;
  
  @autoserializeAs(String, 'num_cpf_cnpj_rec')
  cpfCnpjRecebedor: string;

  @autoserializeAs(String, 'nom_pag')
  nomePagador: string;
  
  @autoserializeAs(String, 'nom_rec')
  nomeRecebedor: string;

  @autoserializeAs(String, 'num_cta_pag')
  contaPagador: string;

  @autoserializeAs(String, 'cod_age_pag')
  agenciaPagador: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
