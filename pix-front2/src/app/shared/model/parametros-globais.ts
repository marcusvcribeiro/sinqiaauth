import { autoserializeAs } from 'cerialize';
import { DateSerializer } from '../serialize/date-serializer';

export class ParametrosGlobais {

  @autoserializeAs(Number, 'cod_emp')
  idEmpresa: Number;

  @autoserializeAs(DateSerializer, 'dat_atu')
  dataReferencia: Date;

  @autoserializeAs(Number, 'id_ent_par')
  idEntidadeParticipante: Number;

  timeout: number;
  dataUltimoLogin: Date;

  flagControleSessao: boolean;

}
