import { deserializeAs } from 'cerialize';

export class DefaultResponse {
  @deserializeAs(String, 'Code')
  code: string;
  @deserializeAs(String, 'Mensagem')
  mensagem: string;
}
