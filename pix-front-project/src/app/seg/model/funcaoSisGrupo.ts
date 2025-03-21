import { Moment } from "moment";
import { FuncaoSistema } from "./funcaoSistema";

export class FuncaoSisGrupo {
  id: string;
  codSistema: string;
  codFun: number;
  codUsuUltMnt: number;
  datUltMnt: Moment;
  datInc: Moment;
  codUsuInc: number;
  flgAtiIna: string;
  funcaoSistema: FuncaoSistema;
}
