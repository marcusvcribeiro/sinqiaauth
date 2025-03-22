import { Condicao } from '../model/enum/condicao';

function filter(field: string, condition: Condicao) {
  return function (target: any, propertyKey: string) {
    let conditions: any = Reflect.get(target, 'conditions');
    if (conditions) {
      conditions.push({ field, condition, propertyKey });
    } else {
      conditions = [{ field, condition, propertyKey }];
    }
    Reflect.set(target, 'conditions', conditions);
  };
}

interface IFilterCondition {
  conditions: Filter[];
}

class Filter {
  field: string;
  condition: Condicao;
  propertyKey: string;
}

export { filter, IFilterCondition, Filter };

