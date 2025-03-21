export class MensagemTarifadaItemDTO {
    dataReferencia: Date;
    sequenciaTransacao: number;
    idEventoMensagem: string;
    descricaoTipoMensagem: string;
    descricaoSituacaoMensagem: string;
    valorFinanceiroTransacao: number;
    valorTarifa: number;
    horarioInicialFaixaTarifa: Date;
    horarioFinalFaixaTarifa: Date;
    dataUltimoProcessamentoEmissor: Date;
    descricaoGrupoComposicaoOperacao: string;
    tamanhoMensagemBytes: number;
    idTipoMensagem: number;
    codigoSistemaParticipante: string;
    codigoOperacaoBancariaParticipante: number;
    numeroOperacao: string;
}
