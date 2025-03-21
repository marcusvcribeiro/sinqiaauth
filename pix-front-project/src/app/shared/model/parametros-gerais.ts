import { CertificadoraDigital } from "./certificadora-digital";
import { TransacaoAgendadas } from "./transacaoAgendadas";

export class ParametrosGerais{
    codigoEmpresa: number;
    saldoIdealContaPI: number;
    percentualMinimoContaPI: number;
    percentualMaximoContaPI: number;
    campoSaldoContaPI: string;
    aporteSaqueAutomaticoContaPI: boolean;
    usuarioPSTA: string;
    senhaPSTA: string;
    diaEnvArqSta: number;
    flgEnvArqSta: boolean;
    qtdMnuItvEnvAla: number;
    qtdMnuItvCsuSdo: number;
    geraConsultaSaldoAutomatico: boolean;
    dataAtual: string;
    idEntidadeParticipante: number;
    idAmbienteConfiguracao: number;
    flgExbCofSavBol: boolean;
    partPossuiIndireto: boolean;
    temAtsIniCbkWbhSgs: number;
    itvExeCbkWbhSgs: number;
    parametroTransacaoAgendada: TransacaoAgendadas[];
    flagControleSessao: boolean;
    qtdMaxRegBol: number;
    horNtfVctCerDgl: string;
    diaAtdNtfVctCerDgl: number;
    certificadoraDigital: CertificadoraDigital;
    urlFrtOrq: string;
    dscNomResInfPix: string;
    dscEmaResInfPix: string;
    dscTelResInfPix: string;
    idCatPtiDict: string;
    itvMesCsuFra: number;
}