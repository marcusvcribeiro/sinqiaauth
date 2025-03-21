import { TipoAlerta } from './enum/tipo-alerta';
export class CobLogWebhook {
  numSequencia?: number;
  dataHoraInclusao?: Date | string;
  dataReferencia?: Date | string;
  dscOcorrencia?: string ;
  sistema?: string;
  dscLogOco?: string;
  tipoOcorrencia: TipoAlerta;
}

