import { deserialize, deserializeAs } from "cerialize";
import { DetalheBloqueioEnum } from "../enum/bloq-detalhe-bloqueio.enum";

export class TransacoesDisponibilidadeModel {
  SistemaOrigem: number;
  AnoReferencia: number;
  MesReferencia: number;
  HorasDisponiveis: number;
  HorasIndisponiveis: number;
}

export class TransacoesDisponibilidade2Model {
  @deserialize cod_sis_par: number;
  @deserialize dsc_sis_par: string;  
  @deserialize num_mes_ref: number;
  @deserialize num_hor_dip_dia: number;
  @deserialize num_hor_isp_per: number;
}
