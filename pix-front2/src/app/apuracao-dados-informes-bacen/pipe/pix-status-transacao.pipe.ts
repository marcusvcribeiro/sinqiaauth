import { PixStatusTrasacaoEnum } from "./../enum/pix-status-transacao.enum";
import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "pixStatusTransacao",
})
export class PixStatusTransacaoPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: PixStatusTrasacaoEnum, ...args: any[]): string {
    switch (value) {
      case PixStatusTrasacaoEnum.Acatada:
        return this.translateService.instant(
          "pipe.pix_status_transacao.acatada"
        );
      case PixStatusTrasacaoEnum.Devolvida:
        return this.translateService.instant(
          "pipe.pix_status_transacao.devolvida"
        );
      case PixStatusTrasacaoEnum.AgendadaDevolvida:
        return this.translateService.instant(
          "pipe.pix_status_transacao.agendadaDevolvida"
        );
      case PixStatusTrasacaoEnum.AgendadaAcatada:
        return this.translateService.instant(
          "pipe.pix_status_transacao.agendadaAcatada"
        );
      default:
        return "";
    }
  }
}
