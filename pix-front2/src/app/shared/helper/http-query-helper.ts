import { HttpQuery } from '../service/http-client.service';

export class HttpQueryHelper {

  /**
   *
   * @param params - Objeto com propriedades para ser convertidos em QueryString
   * @returns {HttpQuery[]}
   */
  static getQueryParams(params): HttpQuery[] {
    const query: HttpQuery[] = [];

    Object.keys(params || {}).filter(key => params[key] !== null && params[key] !== undefined).forEach(name => {
      query.push({ name, value: params[name].toString() });
    });

    return query;
  }
}
