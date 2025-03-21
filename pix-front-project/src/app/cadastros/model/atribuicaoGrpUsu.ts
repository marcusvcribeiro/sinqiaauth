import { deserializeAs, serializeAs } from "cerialize";

export class AtribuicaoGrupoUsuario {
  @serializeAs(Number, 'cod_usu')
  idUsuario: number;

  @serializeAs(Number, 'id_grp_usu')
  idGrupo: number;

  @serializeAs(Number, 'cod_emp_usu')
  codEmpUsu: number;

  @serializeAs(Number, 'cod_usu_ult_mnt')
  codUsuUltMnt: number;

  @serializeAs('dat_ult_mnt')
  datUltMnt: string;
}
