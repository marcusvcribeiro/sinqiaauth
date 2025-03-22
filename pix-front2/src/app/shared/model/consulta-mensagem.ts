export class ConsultaMensagem {
  dataReferenciaMensagemTransacao: Date;
  dataInclusao: Date;
  idMensagem: string;
  numeroUnicoOperacao: string;
  descricaoSituacaoMensagem: string;
  sequenciaTransacao: number;
  descricaoMensagem: string;
  entidadeEmissor: string;
  entidadeDestino: string;
  xmlMensagemControle: string;
  xmlMensagemSistema: string;
}

export class ConsultaMensagemFiltro {
  dataReferencia?: Date | string;
  idMensagem?: string;
  numeroUnicoOperacao?: string;
  idSituacaoMensagem?: number;
  idEntidadeParticipanteEmissor?: number;
  idEntidadeParticipanteDestino?: number;
  sequenciaMensagemTransacao?: number;
}
