import { AgrupadorMensagemTarifada } from './enum/agrupador-mensagem-tarifada';
import { MensagemTarifadaItemDTO } from './mensagem-tarifada-item';

export class MensagemTarifadaGrupoDTO {
    agrupador: AgrupadorMensagemTarifada;
    valorAgrupador: string;
    quantidade: number;
    valor: number;
    tamanho: number;
    itens: MensagemTarifadaItemDTO[];
    grupos: MensagemTarifadaGrupoDTO[];
}
