import { ConsultaFraude } from "./consulta-fraude";
import { TipoConsultaFraude } from "./enum/tipo-consulta-fraude";

export class MarcacaoFraude {
    cpfCnpj: string;
    tipoConsultaFraude: TipoConsultaFraude[];
    consultas: ConsultaFraude[];
    dataUltimaConsultaDateTime: Date;
}