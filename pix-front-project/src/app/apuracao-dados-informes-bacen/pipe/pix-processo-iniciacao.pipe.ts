import { PixProcessoIniciacaoEnum } from "./../enum/pix-processo-iniciacao.enum";
import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "pixProcessoIniciacao",
})
export class PixProcessoIniciacaoPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: PixProcessoIniciacaoEnum, ...args: any[]): string {
    switch (value) {
      case PixProcessoIniciacaoEnum.Manual:
        return this.translateService.instant(
          "pipe.pix-processo-iniciacao.manual"
        );
      case PixProcessoIniciacaoEnum.ValoresPreArmazenados:
        return this.translateService.instant(
          "pipe.pix-processo-iniciacao.valoresPreArmazenados"
        );
      default:
        break;
    }
  }
}
