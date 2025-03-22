import { autoserializeAs } from 'cerialize';
import { DateSerializer } from '../serialize/date-serializer';

export class MensagemTransacao {

  @autoserializeAs(String, 'nom_ent_par_emi')
  nom_ent_par_emi: string;

  @autoserializeAs(String, 'nom_ent_par_des')
  nom_ent_par_des: string;

  @autoserializeAs(DateSerializer, 'dat_inc_msg')
  dataInclusao: Date;

  @autoserializeAs(String, 'dsc_sit_env_msg')
  descricaoSituacao: string;

  @autoserializeAs(String, 'id_eve_msg')
  idMensagem: string;

  @autoserializeAs(Number, 'id_tip_msg')
  idTipoMensagem: number;

  @autoserializeAs(DateSerializer, 'dat_ref_tra')
  dataReferencia: Date;

  @autoserializeAs(Number, 'num_seq_tra')
  idTransacao: number;

  @autoserializeAs(String, 'cod_sis_par')
  codigoSistemaParticipante: string;

  @autoserializeAs(Number, 'cod_ope_ban_par')
  codigoOperacaoBancariaParticipante: number;

  @autoserializeAs(String, 'num_com_ope')
  numeroOperacao: string;

  @autoserializeAs(String, 'id_uni_msg')
  identificadorUnico: string;

  @autoserializeAs(String, 'id_msg_env')
  idMensagemEnviada: string;

  @autoserializeAs(Number, 'id_sit_env_msg')
  idSistemaEnvioMensagem: number;
}
