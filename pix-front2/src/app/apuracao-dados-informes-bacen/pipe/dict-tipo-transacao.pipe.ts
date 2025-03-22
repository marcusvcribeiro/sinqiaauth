import { DictTipoTransacaoEnum } from "./../enum/dict-tipo-transacao.enum";
import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "dictTipoTransacao",
})
export class DictTipoTransacaoPipe implements PipeTransform {

  constructor(private translateService: TranslateService) {}

  transform(value: DictTipoTransacaoEnum, ...args: any[]): string {
    switch (value) {
      case DictTipoTransacaoEnum.AlteracaoChave:
        return this.translateService.instant("pipe.dict_tipo_transacao.alteracaochave");
      case DictTipoTransacaoEnum.ConsultaChave:
        return this.translateService.instant("pipe.dict_tipo_transacao.consultachave");
      case DictTipoTransacaoEnum.ExclusaoChave:
        return this.translateService.instant("pipe.dict_tipo_transacao.exclusaochave");
      case DictTipoTransacaoEnum.InclusaoChave:
        return this.translateService.instant("pipe.dict_tipo_transacao.inclusaochave");
      case DictTipoTransacaoEnum.PortabilidadeChave:
        return this.translateService.instant("pipe.dict_tipo_transacao.portabilidadechave");
      case DictTipoTransacaoEnum.ReinvidicacaoPosse:
        return this.translateService.instant("pipe.dict_tipo_transacao.reinvidicacaoposse");

      default:
        return "";
    }
  }
}
