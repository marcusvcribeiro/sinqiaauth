enum Condicao {
  IGUAL = 'IGUAL',
  MAIOR = 'MAIOR',
  MENOR = 'MENOR',
  MENOR_IGUAL = 'MENOR_IGUAL',
  MAIOR_IGUAL = 'MAIOR_IGUAL',
  CONTEM = 'CONTEM',
  PERIODO_DIA = 'PERIODO_DIA',
  DIFERENTE = 'DIFERENTE'
}

const CONDICAO_LIST: any[] = [
  {
    'label': '=',
    'value': 'IGUAL'
  },
  {
    'label': '>',
    'value': 'MAIOR'
  },
  {
    'label': '<',
    'value': 'MENOR'
  },
  {
    'label': '<=',
    'value': 'MENOR_IGUAL'
  },
  {
    'label': '>=',
    'value': 'MAIOR_IGUAL'
  },
  {
    'label': '<>',
    'value': 'DIFERENTE'
  }
];

export {Condicao, CONDICAO_LIST };

