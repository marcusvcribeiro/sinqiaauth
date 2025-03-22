import { deserializeAs } from 'cerialize';

class DetalheReserva {

  @deserializeAs('num_seq_tra')
  numeroSequencialDaTransacao: number | string;

  @deserializeAs('dat_ref_tra')
  dataReferencia: string;

  @deserializeAs('dsc_est_tra')
  estadoTransacao: string;

  @deserializeAs('dsc_sit_msg')
  situacaoMensagem: string;

  @deserializeAs('vr_cam_res')
  valor: number;

  @deserializeAs('id_eve_msg')
  evento: string;

  @deserializeAs('dsc_res_com_ope')
  composicaoOperacao: string;

  @deserializeAs('dsc_sis_par')
  sistema: string;

  @deserializeAs('dsc_prd_par')
  produto: string;

  @deserializeAs('dsc_ope_ban_par')
  operacaoBancaria: string;

  @deserializeAs('dsc_sis_ori')
  sistemaOrigem: string;

  @deserializeAs('dsc_etd_cnv')
  entidadeConveniada: string;

  @deserializeAs('hor_mov')
  horaMovimentacao: string;

  @deserializeAs('dat_ult_mnt')
  dataUltimaManutencao: string;

  @deserializeAs(Number, 'id_tip_msg')
  idTipoMensagem: number;

  @deserializeAs(String, 'cod_sis_par')
  codigoSistemaParticipante: string;

  @deserializeAs(String, 'cod_ope_ban_par')
  codigoOperacaoBancariaParticipante: number;

  @deserializeAs(String, 'num_com_ope')
  numeroOperacao: string;
}

class DetalheReservaSomaValoresSelecionados {
  valor: number;
  selecionado: boolean;
}

export { DetalheReserva, DetalheReservaSomaValoresSelecionados };
