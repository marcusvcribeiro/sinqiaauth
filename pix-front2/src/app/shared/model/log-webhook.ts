import { TipoAlerta } from './enum/tipo-alerta';
import { DateSerializer } from '../serialize/date-serializer';
import { deserializeAs, autoserializeAs } from 'cerialize';

export class LogWebhook {

  @deserializeAs(Number, 'numSequencia')
  numSequencia: number;

  @deserializeAs(DateSerializer, 'dtInclusao')
  dataHoraInclusao: Date | string;

  @deserializeAs(DateSerializer, 'dtReferencia')
  dataReferencia: Date | string;

  @deserializeAs(String, 'dscOcorrencia')
  dscOcorrencia: string ;

  @deserializeAs(String, 'sistema')
  sistema: string;

  @deserializeAs(String, 'dscLog')
  dscLogOco: string;

  @autoserializeAs(TipoAlerta, 'tipoOcorrencia')
  tipoOcorrencia: TipoAlerta;

}

