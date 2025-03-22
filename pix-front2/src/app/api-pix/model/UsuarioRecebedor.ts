import { DonoChave } from "src/app/shared/model/dono-chave-pix";
import { SituacaoCertificadoUsuarioRecebedorEnum } from "../enum/SituacaoCertificadoUsuarioRecebedorEnum";
import { ContatoUsuarioRecebedor } from './ContatoUsuarioRecebedor';

export class UsuarioRecebedor {
  id: number;
  cnpj: string;
  dono: string;
  nome: string;
  cep: string;
  logradouro: string;
  cidade: string;
  estado: string;
  sistema: number;
  datModificacao: Date;
  usuModificacao: string;
  situacaoClienteSecret: boolean;
  situacaoCertificado: SituacaoCertificadoUsuarioRecebedorEnum;
  contatos: ContatoUsuarioRecebedor[];
  donos: DonoChave[];
  situacao: boolean;
}