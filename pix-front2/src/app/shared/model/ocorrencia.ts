import { deserializeAs, serializeAs } from 'cerialize';

export class Ocorrencia {

  @serializeAs('idOcorrencia')
  @deserializeAs('id_oco')
  idOcorrencia: number;

  @serializeAs('ocorrencia')
  @deserializeAs('dsc_oco')
  ocorrencia: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
