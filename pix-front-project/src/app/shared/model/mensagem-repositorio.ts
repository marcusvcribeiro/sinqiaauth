import { autoserializeAs, deserializeAs } from 'cerialize';
import { DateSerializer } from '../serialize/date-serializer';


// TODO verificar nome das properties aqui, pois não tinha no back, então acabei inferindo alguns nomes
export class MensagemRepositorio {
  @deserializeAs(String, 'dsc_sis_par')
  descricaoSistema: string;

  @deserializeAs(String, 'nom_arq_ent')
  nomeArquivoEntrada: string;

  @autoserializeAs(DateSerializer, 'dat_mov')
  dataMovimento: Date;

  @autoserializeAs(DateSerializer, 'dat_inc')
  dataInclusao: Date;

  @autoserializeAs(DateSerializer, 'dat_pro')
  dataProcessamento: Date;

  @deserializeAs(String, 'id_chv_leg')
  idChaveLegado: string;

  @deserializeAs(Number, 'id_sit_ope_leg')
  idSituacaoOperacaoLegado: number;

  @deserializeAs(String, 'dsc_sit_ope_leg')
  descricaoSituacaoOperacaoLegado: string;

  @deserializeAs(Number, 'num_seq_ent_leg')
  numeroSequencialEntradaLegado: number;

  @autoserializeAs(DateSerializer, 'dat_ref_ent_leg')
  dataReferenciaEntradaLegado: Date;

  @deserializeAs(String, 'cod_msg')
  codigoMensgem: string;

  @deserializeAs(String, 'dsc_tok_itg')
  descricaoTokenIntegracao: string;

  //readolny
  hash: string;
  status: string;

  constructor(obj) {
    Object.assign(this, obj);
  }

}
