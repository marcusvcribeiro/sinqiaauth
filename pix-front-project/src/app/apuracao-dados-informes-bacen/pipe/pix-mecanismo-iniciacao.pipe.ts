import { PixMecanismoIniciacaoEnum } from "./../enum/pix-mecanismo-iniciacao.enum";
import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "pixMecanismoIniciacao",
})
export class PixMecanismoIniciacaoPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: PixMecanismoIniciacaoEnum, ...args: unknown[]): unknown {
    switch (value) {
      case PixMecanismoIniciacaoEnum.ChavePix:
        return this.translateService.instant(
          "pipe.pix-mecanismo-iniciacao.chavePix"
        );
      case PixMecanismoIniciacaoEnum.QrCodeDinamico:
        return this.translateService.instant(
          "pipe.pix-mecanismo-iniciacao.qrCodeDinamico"
        );
      case PixMecanismoIniciacaoEnum.QrCodeEstatico:
        return this.translateService.instant(
          "pipe.pix-mecanismo-iniciacao.qrCodeEstatico"
        );
      case PixMecanismoIniciacaoEnum.ServicodeIniciacao:
        return this.translateService.instant(
          "pipe.pix-mecanismo-iniciacao.servicodeIniciacao"
        );

      default:
        break;
    }
  }
}
