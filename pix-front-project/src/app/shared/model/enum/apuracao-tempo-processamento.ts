enum ApuracaoTemproProcessamentoTipo {
    ANALITICO = 'ANALITICO',
    SINTETICO = 'SINTETICO',
    BLOQUEIO = 'BLOQUEIO',
    DISPONIBILIDADE = 'DISPONIBILIDADE'
}

const APURACAO_TEMPO_PROCESSAMENTO_TIPO_LIST: any[] = [
    {
        id: 'SINTETICO',
        descricao: 'Sintético'
    },
    {
        id: 'ANALITICO',
        descricao: 'Analítico'
    },
    {
        id: 'BLOQUEIO',
        descricao: 'Bloqueio'
    },
    {
        id: 'DISPONIBILIDADE',
        descricao: 'Disponibilidade'
    }
];

export {ApuracaoTemproProcessamentoTipo, APURACAO_TEMPO_PROCESSAMENTO_TIPO_LIST };
