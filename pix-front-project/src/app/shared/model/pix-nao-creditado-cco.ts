import { autoserializeAs, deserializeAs } from "cerialize";

export class PixNaoCreditadoCCO{
    @deserializeAs(String, 'dataInclusao')
    dataInclusao: Date;
    @deserializeAs(Number, 'numSequencial')
    numSequencial: number;
    @deserializeAs(String, 'idEveMsg')
    idEveMsg: string;
    @deserializeAs(String, 'idTipoCobranca')
    idTipoCobranca: string;
    @deserializeAs(String, 'tipoMengemNotificada')
    tipoMengemNotificada: string;
    @deserializeAs(String, 'flgRvoMsgDeadLetter')
    flgRvoMsgDeadLetter: string;
    @deserializeAs(String, 'idUniOpe')
    idUniOpe : string;
    @deserializeAs(Number, 'valor')
    valor: number;
    @deserializeAs(String, 'dscErr')
    dscErr: string;
    @deserializeAs(Number, 'numSeqTra')
    numSeqTra: number;
    @deserializeAs(String, 'dataRefTra')
    dataRefTra: string;
    @deserializeAs(String, 'processId')
    processId: string;
    constructor(obj) {
        Object.assign(this, obj);
      }
}

