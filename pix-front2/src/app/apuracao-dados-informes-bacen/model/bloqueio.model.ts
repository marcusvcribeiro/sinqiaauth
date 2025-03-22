import { deserialize, deserializeAs } from "cerialize";
import { DetalheBloqueioEnum } from "../enum/bloq-detalhe-bloqueio.enum";

export class TransacoesBloqueioModel {
  SistemaOrigem: number;
  HoraInicioBloqueio: string;
  HoraFimBloqueio: string;
  DetalheBloqueio: DetalheBloqueioEnum;
  ValorBloqueio: number;
  EndToEndID: string;
}

export class TransacoesBloqueio2Model {
  @deserialize cod_sis_par: number;
  @deserialize dsc_sis_par: string;  
  @deserialize dat_hor_ini_blo: string;
  @deserialize dat_hor_fim_blo: string;
  @deserialize id_det_blo: DetalheBloqueioEnum;
  @deserialize vr_blo: number;
  @deserialize id_uni_ope: string;
}
