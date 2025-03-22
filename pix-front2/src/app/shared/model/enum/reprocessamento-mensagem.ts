enum TipoReprocessamentoMensagem {
  ENVIO = 1,
  RECEBIMENTO = 2,
  FORMATACAO = 3,
  ENVIO_SAIDA = 4,
  REPOSITORIO_ENTRADA = 5,
  REPOSITORIO_SAIDA = 6
}

const TIPO_REPROCESSAMENTO_MENSAGEM_LIST: any[] = [
  {
    id: 1,
    descricao: 'titulo.envio'
  },
  {
    id: 2,
    descricao: 'titulo.recebimento'
  },
  {
    id: 3,
    descricao: 'titulo.formatacao'
  },
  {
    id: 4,
    descricao: 'titulo.repositorioEnvioSaida'
  },
  {
    id: 5,
    descricao: 'titulo.repositorioEntrada'
  },
  {
    id: 6,
    descricao: 'titulo.repositorioSaida'
  }
];

export { TipoReprocessamentoMensagem, TIPO_REPROCESSAMENTO_MENSAGEM_LIST };
