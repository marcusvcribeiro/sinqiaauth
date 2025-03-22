import { autoserializeAs } from 'cerialize';

export class MensagemRepositorioEntrada {
  @autoserializeAs(String, 'cod_emp')
  empresa: string;

  @autoserializeAs(String, 'id_eve_msg')
  codigo: string;

  @autoserializeAs(String, 'dsc_sis_par')
  sistema: string;

  @autoserializeAs(String, 'cod_ope')
  operacao: string;

  @autoserializeAs(String, 'dsc_com_ope')
  composicaoOperacao: string;

  @autoserializeAs(String, 'id_chv_leg')
  chaveLegado: string;

  @autoserializeAs(String, 'dat_mov')
  agendamento: Date;

  @autoserializeAs(String, 'dat_ref_ent_leg')
  dataReferenciaLegado: Date;

  @autoserializeAs(Number, 'num_seq_ent_leg')
  sequenciaLegado: number;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
