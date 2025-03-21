enum TipoAlerta {
  Erro = 1,
  Aviso = 2,
  Informacao = 3
}

const TIPO_ALERTA_LIST: any[] = [
  {
    'label': 'Erro',
    'value': 1
  },
  {
    'label': 'Aviso',
    'value': 2
  },
  {
    'label': 'Informação',
    'value': 3
  }
];

export {TipoAlerta, TIPO_ALERTA_LIST };
