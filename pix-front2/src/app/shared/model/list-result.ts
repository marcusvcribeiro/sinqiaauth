import { Deserialize, deserializeAs, Serialize, serializeAs } from 'cerialize';
import { PageInfo } from './page-info';


function Custom(type?) {
  return {
    Serialize: function (value: any) {
      return Serialize(value, type);
    },
    Deserialize: function (json: any) {
      return Deserialize(json, type);
    }
  };
}

function listResult(t?) {
  class InnerListResult<T> {
    @serializeAs('_metadata') @deserializeAs(PageInfo, '_metadata') metadata: PageInfo;
    @serializeAs('_records') @deserializeAs(Custom(t), '_records') records: T[];
  }
  return new InnerListResult();
}

class ListResult<T> {
  @serializeAs('_metadata')
  @deserializeAs(PageInfo, '_metadata')
  metadata: PageInfo;

  @serializeAs('_records')
  @deserializeAs('_records')
  records: T[];
}

class ListResultCore<T> {
  content: T[];
  total: number;
}



export { listResult, ListResult, ListResultCore };

