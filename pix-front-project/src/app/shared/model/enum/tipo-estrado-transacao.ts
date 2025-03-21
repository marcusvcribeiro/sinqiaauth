export enum TipoEstadoTransacao {
  AGENDADA = 'Agendada',
  BLOQUEADA = 'Bloqueada',
  LIBERADA_ENVIO = 'Liberada para envio',
  LIBERADA_FORMATACAO = 'Liberada para formatação da mensagem',
  COMANDADA = 'Comandada',
  PROCESSO_INCLUSAO = 'Em processo de inclusão',
  ENVIO_BLOQUEADO = 'Envio bloqueado',
  ERRO_FORMATACAO_MENSAGEM = 'Erro formatação da mensagem',
  ERRO_GRAVACAO_REPOSITORIO_SAIDA = 'Erro na gravação do repositório de saída'
}
