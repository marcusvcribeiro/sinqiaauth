import { autoserializeAs } from 'cerialize';
import { Mensagem } from './mensagem';

export class FiltroConsultaDetalhada {
  operador: String;

  @autoserializeAs(String, 'dat_ini')
  dataInicio: string;

  @autoserializeAs(String, 'dat_fim')
  dataFim: string;

  @autoserializeAs(String, 'msg_sel')
  mensagemSelecionadas: Mensagem[];

  @autoserializeAs(String, 'con_do_fil')
  campos: FiltroCampo[];

  constructor(obj) {
    Object.assign(this, obj);
  }

}

export class FiltroCampo {
  campo: string;
  operador: string;
  valor: any;
}
