import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UIMProviderConfig } from './uim-config';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  /**
   * @description
   * Url base do serviço Ui-Manager.
   */
  private _baseUrl: string = null;


  constructor(private uimConfig: UIMProviderConfig, private http: HttpClient) {
    this.setUrl();
  }

  /**
   * @description
   * Método que retorna Url base do serviço Ui-Manager.
   */
  get baseUrl(): string {
    return this._baseUrl;
  }

  /**
   * @description
   * Método encapsula chamada GET do serviço de HttpClient.
   */
  find<T>(path): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const url = `${this.baseUrl}${path}`;
    return this.http.get<T>(url, httpOptions);
  }

  /**
   * @description
   * Método encapsula chamada POST do serviço de HttpClient.
   */
  post<T>(path, body): Observable<T[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const url = `${this.baseUrl}${path}`;
    return this.http.post<T[]>(url, body, httpOptions);
  }

  /**
   * @description
   * Método encapsula chamada PUT do serviço de HttpClient.
   */
  put<T>(path, body): Observable<T[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const url = `${this.baseUrl}${path}`;
    return this.http.put<T[]>(url, body, httpOptions);
  }

  /**
   * @description
   * Método encapsula chamada DELETE do serviço de HttpClient.
   */
  delete<T>(path): Observable<T[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const url = `${this.baseUrl}${path}`;
    return this.http.delete<T[]>(url, httpOptions);
  }

  /**
   * @description
   * Método seta a URL base do serviço Ui-Manager.
   */
  private setUrl() {
    if (this.uimConfig.url) {
      this._baseUrl = this.uimConfig.url;
    } else {
      console.error('Url de conexão do Ui-Manager não informada.');
    }
  }
}
