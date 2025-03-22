import { Injectable } from '@angular/core';
import { Table } from 'primeng/table';
import { ReplaySubject } from 'rxjs';

@Injectable(
  { providedIn: 'root' }
)
export class PreferenciaUsuarioService {
  public readonly tempoAtualizacaoAlerta$: ReplaySubject<number> = new ReplaySubject(1);
  private readonly numeroLinhasDefault: number = 20;
  private readonly tempoAtualizacaoAlertaDefault: number = 10;

  constructor() {

    // Reatribui o valor inicial ao localstorage e ao subject
    this.tempoAtualizacaoAlerta = this.tempoAtualizacaoAlerta;
  }

  set numeroLinhasPagina(numeroLinhas: number) {
    const value = (typeof numeroLinhas === 'number') ? numeroLinhas : this.numeroLinhasDefault;
    window.localStorage.setItem('numeroLinhas', `${value}`);
  }

  get numeroLinhasPagina(): number {
    const numeroLinhas = window.localStorage.getItem('numeroLinhas');
    if (numeroLinhas) {
      return Number(numeroLinhas);
    }

    return this.numeroLinhasDefault;
  }

  get listaLinhaPreferenciaUsuario(): number[] {
    const numeroLinhas = this.numeroLinhasPagina;
    const opcoesDefault = [10,15,20,30,50];
    if(opcoesDefault.indexOf(numeroLinhas)<0){
      for(const opcao of opcoesDefault){
        if(opcao > numeroLinhas){
          opcoesDefault.splice(opcoesDefault.indexOf(opcao),0,numeroLinhas);
          break;
        }
      }
    }
    return opcoesDefault;
  }
  set tempoAtualizacaoAlerta(tempoRefreshNotificacoes: number) {
    const value = (typeof tempoRefreshNotificacoes === 'number') ? tempoRefreshNotificacoes : this.tempoAtualizacaoAlertaDefault;

    window.localStorage.setItem('tempoAtualizacaoAlerta', `${value}`);
    this.tempoAtualizacaoAlerta$.next(value);
  }

  get tempoAtualizacaoAlerta(): number {
    const tempoAtualizacaoAlerta = window.localStorage.getItem('tempoAtualizacaoAlerta');
    if (tempoAtualizacaoAlerta) {
      return Number(tempoAtualizacaoAlerta);
    }

    return this.tempoAtualizacaoAlertaDefault;
  }

}
