enum SituacaoCob {
  Ativa = 1,
  Concluida = 2, 
  RemovidaRec=3,
  RemovidaPsp=4
}

const SITUACAO_COB_LIST: any[] = [
  {
    'label': 'Ativa',
    'value': 1
  },
  {
    'label': 'Concluida',
    'value': 2
  },
  {
    'label': 'Removida pelo Recebedor',
    'value': 3
  },
  {
    'label': 'Removida pelo PSP',
    'value': 4
  }
];

export {SituacaoCob, SITUACAO_COB_LIST };
