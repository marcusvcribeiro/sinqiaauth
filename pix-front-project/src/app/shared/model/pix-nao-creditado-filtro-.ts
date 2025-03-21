import { deserializeAs } from "cerialize";
import { de } from "date-fns/locale";

export class PixNaoCreditadoFiltro {
    @deserializeAs(String, 'dataInicio')
    dataInicio: string;
    @deserializeAs(String, 'dataFim')
    dataFim: string;
    @deserializeAs(Boolean, 'creditado')
    creditado: boolean;
    @deserializeAs(Number, 'idSituacao')
    idSituacao: number;
    @deserializeAs(String, 'mensagem')
    mensagem : string;
    @deserializeAs(String, 'idTipoCobranca')
    idTipoCobranca: string;
    @deserializeAs(Number, 'idUniOpe')
    idUniOpe: number;
    @deserializeAs(String, 'instituicao')
    instituicao: string;
    @deserializeAs(String, 'valor')
    valor: string;
    @deserializeAs(String, 'chaveEnderecamento')
    chaveEnderecamento: string;
    @deserializeAs(Number, 'numSeq')
    numSeq: number;
    @deserializeAs(String, 'dataInclusao')
    dataInclusao: string;
    constructor(obj) {
        Object.assign(this, obj);
      }
}