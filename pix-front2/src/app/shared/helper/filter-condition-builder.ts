import { Condicao } from '../model/enum/condicao';
import { Ordenacao } from '../model/enum/ordenacao';
import { IFilterCondition } from '../decorator/filter.decorator';
import { PeriodoDia } from '../model/enum/periodo-dia';

class Result {
  filtro: Filtro;
  ordenacao: { campo: any, tipo: Ordenacao };
}

class Campo {
  campo: any;
  operador: Condicao;
  valor: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}

class Filtro {
  condicoes: Campo[] = [];
}

class FilterConditionBuilder {
  private static builder: Result = new Result();
  static adicionarFiltro(object: IFilterCondition) {
    const fields = Object.keys(object);
    const arrayFilter: Filtro = new Filtro();

    fields.forEach(field => {
      object.conditions.forEach(condition => {
        if (field === condition.propertyKey) {
          const value = object[field];
          if (value) {
            this.ajusteFiltroCondicao(condition, arrayFilter, value);
          }
        }
      });
    });
    this.builder.filtro = arrayFilter;
    return this;
  }

  static adicionarOrdenacao(params: { campo: any, tipo: Ordenacao }) {
    if (!params) {
      return;
    }
    this.builder.ordenacao = params;
    return this;
  }

  static build() {
    return this.builder;
  }

  static ajusteFiltroCondicao(condition, arrayFilter, value) {
    if (condition.condition === Condicao.PERIODO_DIA) {
      arrayFilter.
      condicoes.push({ campo: condition.field, operador: Condicao.MAIOR , valor: (value + PeriodoDia.HORAINICIO).toString() });
      arrayFilter.
      condicoes.push({ campo: condition.field, operador: Condicao.MENOR, valor: (value + PeriodoDia.HORAFIM).toString() });
    } else {
      arrayFilter.condicoes.push({ campo: condition.field, operador: condition.condition, valor: value.toString() });
    }
  }
}


export { FilterConditionBuilder, Filtro, Campo };
