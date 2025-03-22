import { deserializeAs } from 'cerialize';

export class TransacaoErro {
  @deserializeAs(Number, 'num_seq_tra')
  numeroSequenciaTransacao: number;

  @deserializeAs(String, 'dat_ref_tra')
  dataReferencia: string;

  @deserializeAs(String, 'dsc_erro')
  informacaoErro: string;

  composicaoOperacao?: string;

  evento?: string;

  valor?: number;
}

