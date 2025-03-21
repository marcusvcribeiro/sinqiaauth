import { PixCanalIniciacaoEnum } from "./../enum/pix-canal-iniciacao.enum";
import { PixNaturezaUsuarioEnum } from "./../enum/pix-natureza-usuario.enum";
import { PixMecanismoIniciacaoEnum } from "./../enum/pix-mecanismo-iniciacao.enum";
import { PixProcessoIniciacaoEnum } from "./../enum/pix-processo-iniciacao.enum";
import { PixMotivoRejeicaoEnum } from "./../enum/pix-motivo-rejeicao.enum";
import { TipoTransacaoEnum } from "./../enum/tipo-transacao.enum";
import { PixFonteReceitaEnum } from "./../enum/pix-fonte-receita.enum";
import { PixDetalheTransacaoEnum } from "./../enum/pix-detalhe-transacao.enum";
import { PixEnvolvidoTransacaoEnum } from "./../enum/pix-envolvido-transacao.enum";
import { PixStatusTrasacaoEnum } from "./../enum/pix-status-transacao.enum";
import { deserialize, deserializeAs } from "cerialize";
import { PixFinalidadeTransacaoEnum } from "../enum/pix-finalidade-transacao.enum";
import { InteractionSettingsStore } from "@fullcalendar/core";

export class TransacoesPixModel {
  SistemaOrigem: string;
  DataTransacao: string;
  StatusTransacao: PixStatusTrasacaoEnum;
  EnvolvidoTransacao: PixEnvolvidoTransacaoEnum;
  DetalheTransacao: PixDetalheTransacaoEnum;
  ValorTransacao: number;
  ValorTarifaTransacao: number;
  FonteReceita: PixFonteReceitaEnum;
  HoraInicioTransacao: string;
  HoraFimTransacao: string;
  MotivoRejeicao: PixMotivoRejeicaoEnum;
  ProcessoIniciacao: PixProcessoIniciacaoEnum;
  MecanismoIniciacao: PixMecanismoIniciacaoEnum;
  NaturezaUsuarioPagador: PixNaturezaUsuarioEnum;
  NaturezaUsuarioRecebedor: PixNaturezaUsuarioEnum;
  CanalIniciacao: PixCanalIniciacaoEnum;
  EndToEndID: string;
  Finalidade: PixFinalidadeTransacaoEnum;
  ValorEspecie: number;
}

export class TransacoesPix2Model {
  @deserialize cod_sis_par: string;
  @deserialize dsc_sis_par: string;
  @deserialize dat_inf_spi: string;
  @deserialize id_sta_spi: PixStatusTrasacaoEnum;
  @deserialize id_evl_spi: PixEnvolvidoTransacaoEnum;
  @deserialize id_det_spi: PixDetalheTransacaoEnum;
  @deserialize vr_spi: number;
  @deserialize vr_tar_spi: number;
  @deserialize id_fon_rta_spi: PixFonteReceitaEnum;
  @deserialize hor_ini_spi: string;
  @deserialize hor_fim_spi: string;
  @deserialize id_mot_rej: PixMotivoRejeicaoEnum;
  @deserialize id_pcs_ini: PixProcessoIniciacaoEnum;
  @deserialize id_mcn_ini: PixMecanismoIniciacaoEnum;
  @deserialize id_nat_usu_pag: PixNaturezaUsuarioEnum;
  @deserialize id_nat_usu_rec: PixNaturezaUsuarioEnum;
  @deserialize id_cnl_ini: PixCanalIniciacaoEnum;
  @deserialize id_uni_ope: string;
  @deserialize id_fna_spi: PixFinalidadeTransacaoEnum;
  @deserialize vr_esc: number;
}
