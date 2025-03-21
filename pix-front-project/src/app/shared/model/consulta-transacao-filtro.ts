import { Condicao } from './enum/condicao';
import { filter, IFilterCondition } from '../decorator/filter.decorator';
import { DebitoCredito } from './enum/debito-credito';
import { Content } from '@angular/compiler/src/render3/r3_ast';

class ConsultaTransacaoFiltro implements IFilterCondition {

  @filter('SEQUENCIAL', Condicao.IGUAL)
  sequencia;

  @filter('ESTADO_TRAN', Condicao.IGUAL)
  estadoTransacao;

  @filter('ID_SITUACAO_MSG', Condicao.IGUAL)
  situacaoMensagem;

  @filter('DT_REFERENCIA', Condicao.IGUAL)
  dataReferencia;

  @filter('COD_MENSAGEM', Condicao.CONTEM)
  codigo;

  @filter('DT_INCLUSAO', Condicao.IGUAL)
  dataInclusao;

  @filter('DT_AGENDAMENO', Condicao.IGUAL)
  dataAgendamento;

  @filter('VALOR', Condicao.IGUAL)
  valorFinanceiro;

  @filter('COMPOSICAO', Condicao.IGUAL)
  composicaoOperacao;

  @filter('MODELO', Condicao.CONTEM)
  nomeModeloMensagem;

  @filter('DT_MOVIMENO', Condicao.IGUAL)
  dataMovimento;

  @filter('OPE_BANCARIA', Condicao.IGUAL)
  operacaoBancaria;

  @filter('SISTEMA', Condicao.IGUAL)
  sistema;

  @filter('USUARIO', Condicao.CONTEM)
  usuarioUltimaManutencao;

  @filter('USUARIO_INC', Condicao.CONTEM)
  usuarioInclusao;

  @filter('QTD_AUTORIZACAO', Condicao.IGUAL)
  quantidadeAutorizacao;

  @filter('PRIORIDADE', Condicao.CONTEM)
  prioridade;

  @filter('NUM_OPERACAO', Condicao.CONTEM)
  numeroUnicoOperacao;

  @filter('NUM_CR_MSG_ORI', Condicao.CONTEM)
  numeroUnicoOperacaoOriginal;

  @filter('ENTRADA_MSG', Condicao.IGUAL)
  tipoEntradaMensagem;

  @filter('DT_ULTIMO_PRO', Condicao.IGUAL)
  dataUltimoProcessamentoEmissor;

  @filter('COD_MENSAGEM', Condicao.CONTEM)
  mensagem: string;

  @filter('VALOR', Condicao.MAIOR_IGUAL)
  valorInicio: string;

  @filter('VALOR', Condicao.MENOR_IGUAL)
  valorFim: string;

  @filter('ID_SITUACAO_MSG', Condicao.CONTEM)
  idSituacaoMensagem: number;

  @filter('ID_DEB_CRE', Condicao.IGUAL)
  debitoCredito: DebitoCredito;

  @filter('NUM_CONTROLE_IF', Condicao.CONTEM)
  numeroControleIF: string;

  @filter('ID_TRANSACAO_COB', Condicao.CONTEM)
  idTransacaoCob: string;

  @filter('DT_ULTIMA_MANUTENCAO', Condicao.IGUAL)
  dataUltimaManutencao;

  @filter('CANAL_MENSAGEM', Condicao.IGUAL)
  idCanalMensagem: number;

  @filter('CANAL_MENSAGEM', Condicao.IGUAL)
  canalMensagem: number;

  @filter('AGENCIA', Condicao.IGUAL)
  agencia: string;

  @filter('CONTA', Condicao.IGUAL)
  conta: string;

  @filter('NOM_USU_DBL', Condicao.CONTEM)
  nomeUsuarioDesbloqueio: string;

  dataReferenciaInicio: string;

  dataReferenciaFim: string;

  situacaoTransacao: number;

  conditions;

  constructor(obj) {
    Object.assign(this, obj);
  }
}

export { ConsultaTransacaoFiltro };
