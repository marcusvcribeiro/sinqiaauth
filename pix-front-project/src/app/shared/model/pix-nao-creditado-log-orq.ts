import { autoserializeAs, deserializeAs } from "cerialize";
import { DateSerializer } from "../serialize/date-serializer";
import { TipoAlerta } from "./enum/tipo-alerta";

export class PixNaoCreditadoLogOrq {
  @deserializeAs(Number, 'numSequencia')
  numSequencia: number;

  @deserializeAs(String, 'dataHoraInclusao')
  dataHoraInclusao: Date;

  @deserializeAs(String, 'dataReferencia')
  dataReferencia: Date;

  @deserializeAs(String, 'dscOcorrencia')
  dscOcorrencia: string;

  @deserializeAs(String, 'sistema')
  sistema: string;

  @deserializeAs(String, 'dscLogOco')
  dscLogOco: string;

  @autoserializeAs(TipoAlerta, 'tipoOcorrencia')
  tipoOcorrencia: TipoAlerta;

  @deserializeAs(String, 'nomUsu')
  nomUsu: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}

