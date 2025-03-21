import { PixEnvolvidoTransacaoEnum } from "./../enum/pix-envolvido-transacao.enum";
import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "pixEnvolvidoTransacao",
})
export class PixEnvolvidoTransacaoPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: PixEnvolvidoTransacaoEnum, ...args: any[]): string {
    switch (value) {
      case PixEnvolvidoTransacaoEnum.DiferentesParticipantes:
        return this.translateService.instant(
          "pipe.pix_envolvido_transacao.diferentesParticipantes"
        );
      case PixEnvolvidoTransacaoEnum.MesmaInstituicao:
        return this.translateService.instant(
          "pipe.pix_envolvido_transacao.mesmaInstituicao"
        );

      default:
        return "";
    }
  }
}
