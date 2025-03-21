import { deserializeAs } from 'cerialize';
import { DateSerializer } from '../serialize/date-serializer';

export class BoletagemTrilhaMensagemTransacao {
  @deserializeAs(DateSerializer, 'dat_hor_inc')
  dataInclusao: Date;

  @deserializeAs(String, 'dat_pro_emi')
  dataProcEmissor: string;

  @deserializeAs(String, 'id_eve_msg')
  evento: string;

  @deserializeAs(String, 'dsc_tip_msg')
  tipo: string;

  @deserializeAs(String, 'dsc_sit_env_msg')
  situacao: string;

  @deserializeAs(String, 'id_chv_leg')
  chaveLegado: string;

  @deserializeAs(String, 'id_chv_spb')
  chavePIX: string;

  @deserializeAs(String, 'dat_mqs')
  dataPostagem: string;

  @deserializeAs(DateSerializer, 'dat_hor_pro')
  dataInclusaoMensagem: Date;

  @deserializeAs(Boolean, 'flg_ctg')
  contingencia: boolean;

  @deserializeAs(Boolean, 'flg_cpi_msg')
  copiaMensagem: boolean;

  @deserializeAs(String, 'dsc_msg_sis')
  descricaoLog: string;
}
