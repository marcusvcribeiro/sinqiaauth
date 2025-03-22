import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/shared/service/http-client.service';
import { Observable } from 'rxjs';
import { UsuarioRecebedor } from '../model/UsuarioRecebedor';
import { DonoChave } from 'src/app/shared/model/dono-chave-pix';
import { Credencial } from '../model/Credencial';
import { ContatoUsuarioRecebedor } from '../model/ContatoUsuarioRecebedor';
import { EscoposUsuarioRecebedor } from '../model/EscoposUsuarioRecebedor';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRecebedorService {

  private path = 'usuario-recebedor';
  constructor(private httpClientService: HttpClientService) { }

  obterTodos(): Observable<UsuarioRecebedor[]> {
    return this.httpClientService.core.find<UsuarioRecebedor[]>({ path: this.path });
  }

  obterUm(identificador: number): Observable<UsuarioRecebedor> {
    return this.httpClientService.core.find<UsuarioRecebedor>({ path: `${this.path}/${identificador}` });
  }

  criar(body: UsuarioRecebedor): Observable<UsuarioRecebedor> {
    return this.httpClientService.core.post<UsuarioRecebedor>({ path: this.path, body });
  }

  atualizar(identificador: number, body: UsuarioRecebedor): Observable<UsuarioRecebedor> {
    return this.httpClientService.core.put<UsuarioRecebedor>({ path: `${this.path}/${identificador}`, body });
  }

  gerarCredenciais(identificador: number, usrApi: String): Observable<any> {
    return this.httpClientService.core.post<any>({
      path: `${this.path}/${identificador}/gerar-credenciais`,
      body: { complemento: usrApi }
    });
  }

  reenviarCredenciais(identificador: number, clientId: string): Observable<any> {
    return this.httpClientService.core.post<any>({ path: `${this.path}/${identificador}/reenviar-credenciais/${clientId}` });
  }

  novoSecret(identificador: number, clientId: string): Observable<any> {
    return this.httpClientService.core.post<any>({ path: `${this.path}/${identificador}/gerar-novo-secret/${clientId}` });
  }

  removerCredencial(identificador: number, clientId: string) : Observable<string> {
    return this.httpClientService.core.post<string>({path:`${this.path}/${identificador}/remover-credencial/${clientId}` })
  }

  reenviarCertificado(identificador: number): Observable<any> {
    return this.httpClientService.core.post<any>({ path: `${this.path}/${identificador}/reenviar-certificado` });
  }

  atualizarEndereco(identificador: number, dono: DonoChave): Observable<any> {
    return this.httpClientService.core.post<any>({
      path: `${this.path}/${identificador}/atualizar-endereco-dono`,
      body: dono
    });
  }

  obterCredenciais(identificador: number): Observable<Credencial[]> {
    return this.httpClientService.core.find<Credencial[]>({ path: `${this.path}/${identificador}/credenciais` });
  }

  atualizarContatos(identificador: number, body: ContatoUsuarioRecebedor[]): Observable<any> {
    return this.httpClientService.core.post({
      path: `${this.path}/${identificador}/associar-contato`,
      body: { items: body }
    });
  }

  obterEscopos(identificador: number, clinteId: string): Observable<EscoposUsuarioRecebedor[]> {
    return this.httpClientService.core.find<EscoposUsuarioRecebedor[]>({ path: `${this.path}/${identificador}/escopo-api-pix/${clinteId}` });
  }

  atualizarEscopos(identificador: number, clinteId: string, body: EscoposUsuarioRecebedor[]): Observable<any> {
    return this.httpClientService.core.put({
      path: `${this.path}/${identificador}/associar-escopo-api-pix/${clinteId}`,
      body: { items: body }
    });
  }

}
