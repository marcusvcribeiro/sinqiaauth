import { TipoTransacaoEnum } from "./../enum/tipo-transacao.enum";
import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "tipoTransacao",
})
export class TipoTransacaoPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: TipoTransacaoEnum, ...args: any[]): string {

    switch (value) {
      case TipoTransacaoEnum.dict:
        return this.translateService.instant("pipe.tipo_transacao.dict");

      case TipoTransacaoEnum.pix:
        return this.translateService.instant("pipe.tipo_transacao.pix");

      case TipoTransacaoEnum.bloqueio:
        return this.translateService.instant("pipe.tipo_transacao.bloqueio");

      case TipoTransacaoEnum.disponibilidade:
        return this.translateService.instant("pipe.tipo_transacao.disponibilidade");        

      default:
        return "";
    }
  }
}
