import { TipoConsultaFraude } from "./enum/tipo-consulta-fraude";

export class ConsultaFraude {
    cpfCnpj: string;
    chaveEnderecamento: string;
    dataUltimaConsulta: Date;
    dataUltimaMarcacaoFraude: Date;
    tipoConsultaFraude: TipoConsultaFraude;
    numeroConta: number;
    codigoAgencia: number;
    nomePessoa: string;
    xml: string;
}