import { DictStatusTransacaoEnum } from "./../enum/dict-status-transacao.enum";
import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "dictStatusTransacao",
})
export class DictStatusTransacaoPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: DictStatusTransacaoEnum, ...args: any[]): string {
    switch (value) {
      case DictStatusTransacaoEnum.Cancelamento:
        return this.translateService.instant(
          "pipe.dict_status_transacao.cancelamento"
        );
      case DictStatusTransacaoEnum.Confirmacao:
        return this.translateService.instant(
          "pipe.dict_status_transacao.confirmacao"
        );
      case DictStatusTransacaoEnum.ConsultaBaseInterna:
        return this.translateService.instant(
          "pipe.dict_status_transacao.consultabaseinterna"
        );

      default:
        return "";
    }
  }
}
