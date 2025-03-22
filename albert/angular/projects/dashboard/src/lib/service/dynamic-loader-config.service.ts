import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

/**
 * @description
 * DynamicLoaderConfigService
 * Config que serve para informar os components para o Dynamic loader
 */
@Injectable({
  providedIn: 'root'
})
export class DynamicLoaderConfigService {
  private componentSubjects$: ReplaySubject<Component[]> = new ReplaySubject<Component[]>(1);

  /**
   * @description
   * Carrega lista de components que podem servir como fonte para criação de factories de componentes.
   */
  public loadComponentsConfiguration(components: Component[]) {
    this.componentSubjects$.next(components);
  }

  /**
   * @description
   * Retorna observable com os components que foram carregados.
   */
  public get components(): Observable<Component[]> {
    return this.componentSubjects$.asObservable();
  }
}


export class Component {
  key: string;
  component: any;
}
