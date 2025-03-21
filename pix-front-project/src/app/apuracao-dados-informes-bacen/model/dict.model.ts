import { TipoTransacaoEnum } from "./../enum/tipo-transacao.enum";
import { DictChaveInclusaoEnum } from "./../enum/dict-chave-inclusao.enum";
import { DictTipoTransacaoEnum } from "./../enum/dict-tipo-transacao.enum";
import { DictStatusTransacaoEnum } from "./../enum/dict-status-transacao.enum";
import { deserialize, deserializeAs } from "cerialize";

export class TransacoesDictModel {
  SistemaOrigem: number;
  DataTransacao: string;
  StatusTransacaoDICT: DictStatusTransacaoEnum;
  TipoTransacaoDICT: DictTipoTransacaoEnum;
  ChaveInclusaoDICT: DictChaveInclusaoEnum;
  HoraInicioTransacaoDICT: string;
  HoraFimTransacaoDICT: string;
  HoraAcknowledgeDICT: string | null;
  HoraNotificacaoUsuarioDICT: string;
  HoraInicioEnvioCodigoClient: string;
  HoraFimCodigoClient: string;
}

export class TransacoesDict2Model {
  @deserialize cod_sis_par: number;
  @deserialize dsc_sis_par: string;
  @deserialize dat_inf_dict: string;
  @deserialize id_sta_tra_dict: DictStatusTransacaoEnum;
  @deserialize id_tip_tra_dict: DictTipoTransacaoEnum;
  @deserialize id_chv_inc_dict: DictChaveInclusaoEnum;
  @deserialize hor_ini_tra_dict: string;
  @deserialize hor_fim_tra_dict: string;
  @deserialize hor_ack_dict: string | null;
  @deserialize hor_ntf_usu_dict: string;
  @deserialize hor_ini_env_cod_cli: string;
  @deserialize hor_fim_env_cod_cli: string;

}
