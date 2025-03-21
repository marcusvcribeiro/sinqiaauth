import { deserializeAs } from 'cerialize';

export class SituacaoMensagem {

  @deserializeAs('id_sit_msg')
  idSituacaoMensagem: number;

  @deserializeAs('dsc_sit_msg')
  descricaoSituacaoMensagem: string;
}
