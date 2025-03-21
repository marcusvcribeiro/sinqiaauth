import { deserializeAs, serializeAs, autoserializeAs } from 'cerialize';


export class PageInfo {
  @autoserializeAs(Number, 'ItemPerPage')
  itemPerPage: number;

  @autoserializeAs(Number, 'PageCount')
  pageCount: number;

  @autoserializeAs(Number, 'PageNo')
  pageNo: number;

  @autoserializeAs(Number, 'RecNo')
  recNo: number;

  @autoserializeAs(Number, 'TotalCount')
  totalCount: number;
}
