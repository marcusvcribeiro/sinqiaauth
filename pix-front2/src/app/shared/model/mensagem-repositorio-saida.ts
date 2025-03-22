import { autoserializeAs, deserializeAs } from 'cerialize';
import { DateSerializer } from '../serialize/date-serializer';

// TODO verificar nome das properties aqui, pois não tinha no back, então acabei inferindo alguns nomes
export class MensagemRepositorioSaida {
  @deserializeAs(String, 'id_chv_leg')
  chaveLegado: string;

  @deserializeAs(String, 'id_chv_spi')
  chavePix: string;

  @deserializeAs(String, 'cod_msg')
  codigoMensgem: string;

  @deserializeAs(String, 'dsc_sis_par')
  descricaoSistema: string;

  @autoserializeAs(DateSerializer, 'dat_pro')
  dataProcessamento: Date;

  @deserializeAs(Number, 'id_sit_ope_leg')
  idSituacaoOperacaoLegado: number;

  @deserializeAs(String, 'dsc_sit_ope_leg')
  descricaoSituacaoOperacaoLegado: string;

  @autoserializeAs(DateSerializer, 'dat_inc')
  dataInclusao: Date;

  @autoserializeAs(DateSerializer, 'dat_ref_tra')
  dataReferenciaTransacao: Date;

  @deserializeAs(Number, 'num_seq_tra')
  numeroSenquenciaTransacao: number;

  @deserializeAs(Number, 'num_seq_msg_tra')
  numeroSenquenciaMensagemTransacao: number;

  @deserializeAs(String, 'nom_arq_sai')
  nomeArquivoSaida: string;

  @deserializeAs(Number, 'num_seq_sai_leg')
  numeroSequenciaSaidaLegado: number;

  @autoserializeAs(DateSerializer, 'dat_ref_sai_leg')
  dataReferenciaSaidaLegado: Date;

  // Readonly
  hash: string;
  status: string;

}
