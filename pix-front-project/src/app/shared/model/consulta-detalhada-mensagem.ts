import { autoserializeAs } from 'cerialize';
import { DateSerializer } from '../serialize/date-serializer';

export class ConsultaDetalhadaMensagem {

  @autoserializeAs(String, 'dsc_est_tra')
  estadoTransacao: string;

  @autoserializeAs(String, 'dsc_sit_msg')
  situacaoMensagem: string;

  @autoserializeAs(String, 'id_eve_msg')
  idMensagem: string;

  @autoserializeAs(DateSerializer, 'dat_inc')
  dataInclusao: Date;

  @autoserializeAs(DateSerializer, 'dat_mov')
  dataMovimento: Date;

  @autoserializeAs(Number, 'vr_fin_tra')
  valorFinanceiro: number;

  @autoserializeAs(String, 'dsc_res_com_ope')
  composicaoOperacao: string;

  @autoserializeAs(String, 'dsc_ope_ban_par')
  operacaoBancaria: string;

  @autoserializeAs(String, 'dsc_sis_par')
  sistema: string;

  @autoserializeAs(Number, 'id_tip_msg')
  idTipoMensagem: number;

  @autoserializeAs(String, 'nom_usu_ult_mnt')
  usuarioUltimaManutencao: string;

  @autoserializeAs(String, 'nom_usu_inc')
  usuarioInclusao: string;

  @autoserializeAs(Number, 'cod_sis_par')
  codigoSistemaParticipante: number;

  @autoserializeAs(Number, 'cod_ope_ban_par')
  codigoOperacaoBancariaParticipante: number;

  @autoserializeAs(String, 'num_com_ope')
  numeroOperacao: string;

  @autoserializeAs(Number, 'num_seq_tra')
  numeroSequenciaTransacao: number;

  @autoserializeAs(DateSerializer, 'dat_ref_tra')
  dataReferencia: Date;

  constructor(obj) {
    Object.assign(this, obj);
  }

}
