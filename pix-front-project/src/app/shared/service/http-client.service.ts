import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deserialize, Serialize, __TypeMap } from 'cerialize';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpQueryHelper } from '../helper/http-query-helper';

export interface HttpQuery {
  name: string;
  value: any;
}

export interface HttpBancosParams {
  path: string;
  id?: number;
  queryParams?: HttpQuery[];
  urlParams?: object;
  body?: any;
  queryObj?: { [key: string]: any };
  throwErrors?: boolean;
  hideProgressBar?: boolean;
  responseType?: object;
  options?;
}

interface HttpOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
}

class DefaultClientService {
  constructor(private baseUrl: string, private http: HttpClient) { }

  find<T>(params: HttpBancosParams): Observable<T> {
    params = this.getSerializeRequest(params);
    const url = `${this.baseUrl}/${params.path}`;
    const options = this.getOptions(params);

    if (params.responseType) {
      return this.deserialize(this.http.get<T>(url, options), params.responseType);
    }
    return this.http.get<T>(url, options);
  }

  findOption(params: HttpBancosParams): Observable<Object> {
    params = this.getSerializeRequest(params);
    const { path, urlParams } = params;
    const header = this.createHeader(params);
    const param = this.getParams(...params.queryParams);

    const url = `${this.baseUrl}/${path}${this.convertParamsToUrlParams(urlParams)}`;

    const response = this.http.get(url, {
      headers: header,
      observe: 'response',
      params: param,
      reportProgress: false,
      responseType: 'blob',
      withCredentials: false
    });

    if (params.responseType) {
      return this.deserialize(response, params.responseType);
    }

    return response;
  }

  findOne<T>(params: HttpBancosParams): Observable<T> {
    params = this.getSerializeRequest(params);
    const { path, id, urlParams } = params;
    const url = `${this.baseUrl}/${path}/${id}${this.convertParamsToUrlParams(urlParams)}`;
    const options = this.getOptions(params);

    if (params.responseType) {
      return this.deserialize(this.http.get<T>(url, options), params.responseType);
    }
    return this.http.get<T>(url, options);
  }

  get(params: HttpBancosParams): Observable<any> {
    params = this.getSerializeRequest(params);
    const { path, id, urlParams } = params;
    const url = `${this.baseUrl}/${path}`;

    return this.http.get(url, { responseType: 'text'});
  }

  post<T>(params: HttpBancosParams): Observable<T> {
    params = this.getSerializeRequest(params);
    const url = `${this.baseUrl}/${params.path}`;
    const options = this.getOptions(params);

    if (params.responseType) {
      return this.deserialize(this.http.post<T>(url, params.body, options), params.responseType);
    }
    return this.http.post<T>(url, params.body, options);
  }

  postOption<T>(params: HttpBancosParams): Observable<Object> {
    params = this.getSerializeRequest(params);
    const { path, urlParams } = params;
    const header = this.createHeader(params);
    const param = this.getParams(...params.queryParams);

    const url = `${this.baseUrl}/${path}${this.convertParamsToUrlParams(urlParams)}`;

    const response = this.http.post(url, params.body, {
      headers: header,
      observe: 'response',
      params: param,
      reportProgress: false,
      responseType: 'blob',
      withCredentials: false
    });

    if (params.responseType) {
      return this.deserialize(response, params.responseType);
    }

    return response;
  }

  put<T>(params: HttpBancosParams): Observable<T> {
    params = this.getSerializeRequest(params);
    const { path, id, body, urlParams } = params;
    const options = this.getOptions(params);

    let url;
    if (id) {
      url = `${this.baseUrl}/${path}/${id}${this.convertParamsToUrlParams(urlParams)}`;
    } else {
      url = `${this.baseUrl}/${path}`;
    }

    if (params.responseType) {
      return this.deserialize(this.http.put<T>(url, params.body, options), params.responseType);
    }
    return this.http.put<T>(url, params.body, options);
  }

  delete<T>(params: HttpBancosParams): Observable<T> {
    /**
     * Este DELETE foi modificado, pois na API deve se passar uma Request DELETE com body e sem um ID
     */
    params = this.getSerializeRequest(params);
    const options = { body: params.body, ...this.getOptions(params), params: this.getParams(...params.queryParams) };

    const { path, id, urlParams } = params;
    let url;

    if (id) {
      url = `${this.baseUrl}/${path}/${id}${this.convertParamsToUrlParams(urlParams)}`;
    } else if (urlParams) {
      url = `${this.baseUrl}/${path}/${this.convertParamsToUrlParams(urlParams)}`;
    } else {
      url = `${this.baseUrl}/${path}`;
    }

    if (params.responseType) {
      return this.deserialize(this.http.request<T>('delete', url, options), params.responseType);
    }
    return this.http.request<T>('delete', url, options);
  }

  private deserialize<T>(observable: Observable<T>, instancia) {
    return observable.pipe(map(result => {
      if (typeof instancia === 'object') {
        return Deserialize(result, instancia.constructor);
      }
      return Deserialize(result, instancia);
    }));
  }


  private createHeader(params: HttpBancosParams) {
    const headers: any = {};

    // Só cancela a captura de erros se realmente foi informado false
    if (params.throwErrors) {
      Object.assign(headers, { catchErrors: 'true' });
    }
    // cancela a exibição da barra de progresso quando informado
    if (params.hideProgressBar) {
      Object.assign(headers, { hideProgressBar: 'true' });
    }

    return { headers };
  }

  private getSerializeRequest(params: HttpBancosParams): HttpBancosParams {
    if (params.queryObj && this.isDecorated(params.queryObj)) {
      params.queryParams = HttpQueryHelper.getQueryParams(Serialize(params.queryObj));
    } else {
      params.queryParams = HttpQueryHelper.getQueryParams(params.queryObj);
    }
    if (params.body && this.isDecorated(params.body)) {
      params.body = Serialize(params.body);
    }
    if (params.body && params.body instanceof Array) {
      const body = [];
      for (const e of params.body) {
        if (this.isDecorated(e)) {
          body.push(Serialize(e));
        } else {
          body.push(e);
        }
      }
      params.body = body;
    }
    return params;
  }

  private convertParamsToUrlParams(params: object) {
    if (params !== null && typeof params === 'object') {
      return Object.entries(params).map(values => values.reduce((accumulator, value) => `/${accumulator}/${value}`)).join('');
    } else {
      return '';
    }
  }

  private getParams(..._query: HttpQuery[]) {
    const query = [];
    if (_query && _query.length > 0) {
      for (const _queryValue of _query) {
        if (_queryValue) {
          query.push(_queryValue);
        }
      }
    }

    if (query && query.length > 0) {
      let httpParamns: HttpParams = new HttpParams();
      for (const httpQuery of query) {
        httpParamns = httpParamns.set(httpQuery.name, httpQuery.value);
      }
      return httpParamns;
    }

    return undefined;
  }

  private isDecorated<T>(instance: T): boolean {
    const metaDatas = __TypeMap.get(instance.constructor);
    if (!metaDatas || metaDatas.length === 0) {
      return false;
    }
    const propriedades = Object.getOwnPropertyNames(instance);
    if (!propriedades || propriedades.length === 0) {
      return false;
    }
    for (const propriedade of propriedades) {
      const metaData = metaDatas.find(v => v['keyName'] === propriedade);
      if (metaData && metaData['serializedKey']) {
        return true;
      }
    }
    return false;
  }

  private getOptions(param): HttpOptions {
    const header = this.createHeader(param);
    const params = this.getParams(...param.queryParams);

    return { headers: header, observe: 'body', params: params };
  }

}


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  ui = new DefaultClientService(environment.api.ui, this.http);
  pix = new DefaultClientService(environment.api.pix, this.http);
  pix_mock = new DefaultClientService(environment.api.pix_mock, this.http);
  core = new DefaultClientService(environment.api.core, this.http);
  seg = new DefaultClientService(environment.api.seg, this.http);
  relatorios = new DefaultClientService(environment.api.relatorios, this.http);
  cob = new DefaultClientService(environment.api.cob, this.http);
  logLeg = new DefaultClientService(environment.api.logLeg, this.http);
  constructor(private http: HttpClient) { }
}
