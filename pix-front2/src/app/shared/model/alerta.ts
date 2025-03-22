import { deserializeAs, serializeAs, autoserializeAs } from 'cerialize';
import { TipoAlerta } from './enum/tipo-alerta';
import { DateSerializer } from '../serialize/date-serializer';
import { filter, IFilterCondition } from '../decorator/filter.decorator';
import { Condicao } from './enum/condicao';

export class Alerta {

  @autoserializeAs(Number, 'num_seq_env_ala')
  numeroSequencial: number;

  @autoserializeAs(String, 'dat_ref_env_ala')
  dataReferencia: string;

  @autoserializeAs(DateSerializer, 'dat_env_ala')
  dataEnvio: Date;

  @autoserializeAs(String, 'dsc_ala')
  descricao: string;

  @autoserializeAs(String, 'dsc_asu')
  assunto: string;

  @autoserializeAs(String, 'dsc_msg')
  descricaoMensagem: string;

  @autoserializeAs(TipoAlerta, 'id_tip_ala')
  tipoAlerta: TipoAlerta;

  @autoserializeAs(DateSerializer, 'dat_rec_ala')
  dataRecebimento: Date;

  @autoserializeAs(String, 'usu_sis')
  usuario: string;

  mensagemRecebimento: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}

export class AlertaQuery {

  @serializeAs('itemPerPage')
  limit: number;

  @serializeAs('pageNo')
  page: number;

  constructor(obj) {
    Object.assign(this, obj);
  }
}


export class AlertaBody {

  @autoserializeAs(Number, 'num_seq_env_ala')
  numeroSequencial: number;

  @autoserializeAs(String, 'dat_ref_env_ala')
  dataReferencia: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}


export class AlertaFiltro implements IFilterCondition {

  @filter('ASSUNTO', Condicao.CONTEM)
  @deserializeAs(String, 'dsc_asu')
  assunto: string;

  @filter('TIPO', Condicao.IGUAL)
  @deserializeAs(String, 'id_tip_ala')
  tipo: TipoAlerta;

  @filter('USUARIO', Condicao.CONTEM)
  @deserializeAs(String, 'usu_sis')
  usuario: string;

  conditions;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
