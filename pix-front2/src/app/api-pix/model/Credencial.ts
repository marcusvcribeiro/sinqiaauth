import { ContatoUsuarioRecebedor } from './ContatoUsuarioRecebedor';

export class Credencial{

  clientId: string;
  codUsuRec: number;
  situacaoKeycloak: boolean;
  contatos: ContatoUsuarioRecebedor[];
}