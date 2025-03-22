import { autoserializeAs, serializeAs } from 'cerialize';
import { DateSerializer } from '../serialize/date-serializer';

class Transacao {

  @autoserializeAs('num_seq_tra')
  numeroSequenciaTransacao?: Number;

  @autoserializeAs(String, 'id_sit_msg')
  situacaoMensagem?: string;

  @autoserializeAs(DateSerializer, 'dat_ref_tra')
  dataReferencia?: string;

  @autoserializeAs(DateSerializer, 'dat_mov')
  dataMovimento?: string;

  @autoserializeAs(String, 'id_eve_msg')
  idMensagem: string;

  @autoserializeAs(Number, 'vr_fin_tra')
  valor?: number;

  @autoserializeAs(String, 'dsc_res_com_ope')
  composicaoOperacao?: string;

  @autoserializeAs(String, 'cod_ope_ban_par')
  codigoOperacaoBancariaParticipante: number;

  @autoserializeAs(String, 'cod_sis_par')
  codigoSistemaParticipante: string;

  @autoserializeAs(String, 'id_tip_msg')
  idTipoMensagem: string;

  @autoserializeAs(String, 'num_com_ope')
  numeroOperacao: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}

class TransacaoID {

  @serializeAs('dat_ref_tra')
  dataReferencia: Date;

  @serializeAs('num_seq_tra')
  numeroSequenciaTransacao: Number;

  constructor(obj) {
    Object.assign(this, obj);
  }
}

class PostTransacao {

  @serializeAs('transacoes')
  transacoes: TransacaoID[];

  constructor(obj) {
    Object.assign(this, obj);
  }

  setTransacoes(values) {
    const array = [];
    values.forEach(element => {
      array.push(element);
    });
    this.transacoes = array;
  }
}

class ExcluirTransacao {

  @serializeAs('transacoes')
  transacoes: TransacaoID[];

  constructor(obj) {
    Object.assign(this, obj);
  }

  setTransacoes(values: TransacaoID[]) {
    const array: TransacaoID[] = [];
    values.forEach(element => {
      array.push(new TransacaoID(element));
    });
    this.transacoes = array;
  }
}

class VerificarMensagem {

  @serializeAs('dsc_mot')
  descricaoMotivo: string;

  @serializeAs('transacoes')
  transacoes: TransacaoID[];

  constructor(obj) {
    Object.assign(this, obj);
  }

  setTransacoes(values: TransacaoID[]) {
    const array: TransacaoID[] = [];
    values.forEach(element => {
      array.push(new TransacaoID(element));
    });
    this.transacoes = array;
  }
}

class TransacaoSomaValoresSelecionados {
  valor: number;
  selecionado: boolean;
}

export { Transacao, TransacaoID, ExcluirTransacao, VerificarMensagem, PostTransacao, TransacaoSomaValoresSelecionados };

