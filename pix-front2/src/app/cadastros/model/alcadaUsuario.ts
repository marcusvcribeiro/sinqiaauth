import { deserializeAs } from "cerialize";

export class AlcadaUsuario{
  @deserializeAs(Number, 'cod_usu')
  id: number;

  @deserializeAs('dsc_lgi_usu_ree')
  dscLgiUsuRee: string;

  @deserializeAs('nom_usu')
  nomeUsu: string;
}
