import { deserializeAs } from 'cerialize';

export class PosicaoReserva {

  @deserializeAs(String, 'nom_cam_vr')
  campo: string;

  @deserializeAs(String, 'dsc_cam_vr')
  descricao: string;

  @deserializeAs(String, 'lbl_cam_vr')
  label: string;

  @deserializeAs(Number, 'vr_cam')
  valor: number;

  @deserializeAs(Boolean, 'flg_cam_cal')
  calculado: boolean;

  @deserializeAs(Boolean, 'flg_cam_des')
  destaque: boolean;

}
