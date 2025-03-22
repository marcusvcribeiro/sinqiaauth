import { deserializeAs } from 'cerialize';

export class BoletagemTrilhaMensagem {
  @deserializeAs(String, 'dat_hor_pro')
  data: string;

  @deserializeAs(String, 'dsc_sit_msg')
  situacaoMensagem: string;

  @deserializeAs(Boolean, 'flg_enc_tra')
  encerraTransacao: boolean;

  @deserializeAs(String, 'nom_usu')
  nomeUsuario: string;
}
