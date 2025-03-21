import { deserializeAs } from 'cerialize';
import { DateSerializer } from '../serialize/date-serializer';

export class BoletagemTrilhaMensagem {
  @deserializeAs(DateSerializer, 'dat_hor_pro')
  data: Date;

  @deserializeAs(String, 'dsc_sit_msg')
  situacaoMensagem: string;

  @deserializeAs(Boolean, 'flg_enc_tra')
  encerraTransacao: boolean;

  @deserializeAs(String, 'nom_usu')
  nomeUsuario: string;
}
