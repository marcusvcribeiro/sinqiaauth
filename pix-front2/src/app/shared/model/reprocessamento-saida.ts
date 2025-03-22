import { autoserializeAs } from 'cerialize';
import { DateSerializer } from '../serialize/date-serializer';

export class ReprocessamentoSaida {

  @autoserializeAs(DateSerializer, 'dat_ref_sai_leg')
  dataReferenciaRepositorioSaida: Date;

  @autoserializeAs(Number, 'num_seq_sai_leg')
  numSequenciaRepositorioSaida: Number;

  @autoserializeAs(String, 'cod_emp')
  codigoEmpresa: string;

  @autoserializeAs(String, 'cod_msg')
  codigoMensgem: string;

  @autoserializeAs(String, 'dsc_sis_par')
  descricaoSistema: string;

  @autoserializeAs(String, 'cod_ope')
  operacao: string;

  @autoserializeAs(String, 'num_com_ope')
  numeroComposicaoOperacao: string;

  @autoserializeAs(String, 'id_chv_leg')
  chaveLegado: string;

  @autoserializeAs(String, 'id_chv_spi')
  chavePix: string;

  constructor(obj) {
    Object.assign(this, obj);
  }

}
