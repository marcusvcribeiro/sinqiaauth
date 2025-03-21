import { PixCanalIniciacaoEnum } from "./../enum/pix-canal-iniciacao.enum";
import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "pixCanalIniciacao",
})
export class PixCanalIniciacaoPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: PixCanalIniciacaoEnum, ...args: any[]): string {
    switch (value) {
      case PixCanalIniciacaoEnum.ATM:
        return this.translateService.instant(
          "pipe.pix-canal-iniciacao.aTM"
        );
      case PixCanalIniciacaoEnum.Agencia:
        return this.translateService.instant(
          "pipe.pix-canal-iniciacao.agencia"
        );
      case PixCanalIniciacaoEnum.AplicativoInstituicao:
        return this.translateService.instant(
          "pipe.pix-canal-iniciacao.aplicativoInstituicao"
        );
      case PixCanalIniciacaoEnum.CallCenter:
        return this.translateService.instant(
          "pipe.pix-canal-iniciacao.callCenter"
        );
      case PixCanalIniciacaoEnum.InternetBankingInstituicao:
        return this.translateService.instant(
          "pipe.pix-canal-iniciacao.internetBankingInstituicao"
        );

      default:
        return "";
    }
  }
}
