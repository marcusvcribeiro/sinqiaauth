import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PixFinalidadeTransacaoEnum } from "../enum/pix-finalidade-transacao.enum";

@Pipe({
  name: "pixFinalidadeTransacao",
})
export class PixFinalidadeTransacaoPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: PixFinalidadeTransacaoEnum, ...args: any[]): string {
    switch (value) {
      case PixFinalidadeTransacaoEnum.PixCompraTransferencia:
        return this.translateService.instant(
          "pipe.pix-finaliidade-transacao.compraTransferecnia"
        );
      case PixFinalidadeTransacaoEnum.PixSaque:
        return this.translateService.instant(
          "pipe.pix-finaliidade-transacao.saque"
        );
      case PixFinalidadeTransacaoEnum.PixTroco:
        return this.translateService.instant(
          "pipe.pix-finaliidade-transacao.troco"
        );

      default:
        return "";
    }
  }
}
