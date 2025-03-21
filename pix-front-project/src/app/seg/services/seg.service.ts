import { HistoricoFuncaoUsuario } from 'src/app/seg/model/historicoFuncaoUsuario';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClientService } from "src/app/shared/service/http-client.service";
import { Grupo } from "../model/grupo";
import { Usuario } from "../model/usuario";
import { FuncaoSistema } from "../model/funcaoSistema";
import { OperacaoSeg } from "../model/operacao.enum";
import { Parametro } from "../model/parametro";
import { HistoricoLogin } from "../model/historicoLogin";
import { DateFormatHelper } from "src/app/shared/helper/date-format-helper";
import { Dicionario } from '../model/dicionario';
import { ListResult } from 'src/app/shared/model/list-result';
import { HistoricoAlteracaoUsuario } from '../model/historicoAlteracaoUsuario';
import { Ordenacao } from 'src/app/shared/model/enum/ordenacao';
import { HistoricoAlteracaoUsuarioFiltro } from 'src/app/shared/model/historico-alteracao-usuario-filtro';

@Injectable({
  providedIn: "root",
})
export class SegService {

  constructor(private httpClientService: HttpClientService) { }

  // #region grupos
  getGrupos(): Observable<Grupo[]> {
    const path = "grupos";
    return this.httpClientService.seg.find<Grupo[]>({ path });
  }

  getGruposId(id): Observable<Grupo[]> {
    const path = `grupos/${id}`;
    return this.httpClientService.seg.find<Grupo[]>({ path });
  }

  getGruposUsuario(usuario: number): Observable<Grupo[]> {
    const path = `grupos/usuario/${usuario}`;
    return this.httpClientService.seg.find<Grupo[]>({ path });
  }

  salvarGrupo(body: Grupo): Observable<any> {

    if (body.operacao == OperacaoSeg.Inserir) {
      const path = "grupos";
      return this.httpClientService.seg.post({ path, body });
    } else {
      const path = `grupos/${body.id}`;
      return this.httpClientService.seg.put({ path, body });
    }

  }

  atribuirGruposAoUsuario(usuario: number, grupos: Grupo[]): Observable<any> {
    const path = `grupos/usuario/${usuario}`;
    return this.httpClientService.seg.post({ path, body: { lista: grupos } });
  }
  //#endregion

  // #region usuários
  getUsuarios(): Observable<Usuario[]> {
    const path = "usuarios";
    return this.httpClientService.seg.find<Usuario[]>({ path });
  }


  salvarUsuario(body: Usuario): Observable<any> {

    if (body.operacao == OperacaoSeg.Inserir) {
      const path = "usuarios";
      return this.httpClientService.seg.post({ path, body });
    } else {
      const path = `usuarios/${body.id}`;
      return this.httpClientService.seg.put({ path, body });
    }

  }

  //#endregion

  // #region funções
  atribuirFuncoesAoGrupo(
    grupo: string,
    funcoes: FuncaoSistema[]
  ): Observable<any> {
    const path = `funcoes/grupo/${grupo}`;
    return this.httpClientService.seg.post({ path, body: { lista: funcoes } });
  }

  getFuncoesPorSistema(): Observable<FuncaoSistema[]> {
    const path = `funcoes/sistema/${environment.sistema}`;
    return this.httpClientService.seg.find<FuncaoSistema[]>({ path });
  }
  // #endregion

   // #region dicionario senhas fracas

   getSenhasFracas(): Observable<Dicionario[]> {
    const path = "dicionariosenhafraca";
    return this.httpClientService.seg.find<Dicionario[]>({ path });
  }

  salvarSenhaFracaDicionario(body: Dicionario): Observable<any> {
    if (body.operacao == OperacaoSeg.Inserir) {
      const path = "dicionariosenhafraca";
      return this.httpClientService.seg.post({ path, body });
    } else {
      const path = `dicionariosenhafraca/${body.id}`;
      return this.httpClientService.seg.put({ path, body });
    }

  }
  removerSenhaFraca(senhaFracaId: number) : Observable<any> {
    const path = `dicionariosenhafraca/${senhaFracaId}`;
    return this.httpClientService.seg.delete({path});
  }
    // #endregion


  getFuncoesSisGrupo(grupo: string): Observable<FuncaoSistema[]> {
    const path = `permissoes/${grupo}`;
    return this.httpClientService.seg.find<FuncaoSistema[]>({ path });
  }

  loadPermissions() {
    const path = 'permissoes';
    return this.httpClientService.seg.find<string[]>({ path }).subscribe(data => {
      localStorage.removeItem('seg-funcao');
      localStorage.setItem('seg-funcao', JSON.stringify(data));
    });
  }

  novaSenhaUsuario(id: number, body: any): Observable<any> {
    const path = `usuarios/${id}/senha`;
    return this.httpClientService.seg.put({ path, body });
  }

  obterParametrosDefault(): Observable<Parametro> {
    return this.httpClientService.seg.find<Parametro>({ path: 'parametros' });
  }
  obterHistoricoLogin(): Observable<HistoricoLogin[]>{
    return this.httpClientService.seg.find<HistoricoLogin[]>({path: 'login'})
  }
  obterHistoricoLoginFiltro(filtro: any): Observable<HistoricoLogin[]>{
    return this.httpClientService.seg.post({path:'loginfiltro', body:{usuario: filtro.usuario, dataIni: filtro.dataIni, dataFim: filtro.dataFim}})
  }
  obterHistoricoFuncaoUsuario():Observable<HistoricoFuncaoUsuario[]>{
    return this.httpClientService.seg.find<HistoricoFuncaoUsuario[]>({path: 'historicofuncoes'})
  }
  obterHistoricoFuncaoUsuarioFiltro(filtro: any): Observable<HistoricoFuncaoUsuario[]>{
    return this.httpClientService.seg.post({path:'historicofuncoesfiltro', body:{usuario: filtro.usuario, dataIni: filtro.dataIni, dataFim: filtro.dataFim, funcionalidade:filtro.funcionalidade}})
  }
  salvarHistoricoFuncaoUsuario(body:any): Observable<HistoricoFuncaoUsuario> {
    const path = `historicofuncoes`;
    return this.httpClientService.seg.post({ path, body });
  }

  exportarExcel(body : any, excelNome: any): Observable<any> {
    const path = `relatorio/download/${excelNome}`;
    const options = { observe: 'response', responseType: 'blob' };
    return this.httpClientService.relatorios.postOption({
      path, body, options
    });
  }


  listarHistoricoAlteracaoUsuario(filtro: HistoricoAlteracaoUsuarioFiltro,
    params?: { limit?: number, page?: number, sortBy?: string, sortDirection?: Ordenacao }
  ): Observable<ListResult<HistoricoAlteracaoUsuario>> {
    const dataInicio = DateFormatHelper.toUrlDate(filtro.dataIniTrilha);
    const dataFim = DateFormatHelper.toUrlDate(filtro.dataFimTrilha);
    const path = `historicoalteracao`;

    return this.httpClientService.seg.find<ListResult<HistoricoAlteracaoUsuario>>({path, queryObj: {
      "dataInicio": dataInicio,
      "dataFim": dataFim,
      "nomeUsuario": filtro.nomeUsuario,
      "nomeAplicacao": filtro.nomeAplicacao,
      "itemPerPage": params.limit,
      "pageNo": params.page
    }});
  }
}
