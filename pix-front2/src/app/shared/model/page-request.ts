import { serializeAs } from 'cerialize';
import { Ordenacao } from './enum/ordenacao';

export class PageRequest {

  @serializeAs('itemPerPage')
  limit: number;

  @serializeAs('pageNo')
  page: number;

  sortBy: String;

  sortDirection: Ordenacao;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
