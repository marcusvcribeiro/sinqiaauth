import { PixDetalheTransacaoEnum } from "./../enum/pix-detalhe-transacao.enum";
import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "pixDetalheTransacao",
})
export class PixDetalheTransacaoPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: PixDetalheTransacaoEnum, ...args: any[]): string {
    switch (value) {
      case PixDetalheTransacaoEnum.EnvCliDifInstRejeitadasAposTratamentoSuspeitaFraude:
        return this.translateService.instant("pipe.pix_detalhe_transacao.EnvCliDifInstRejeitadasAposTratamentoSuspeitaFraude");
      case PixDetalheTransacaoEnum.EnvCliMesmaInstRejeitadasAposTratamentoSuspeitaFraude:
        return this.translateService.instant("pipe.pix_detalhe_transacao.EnvCliMesmaInstRejeitadasAposTratamentoSuspeitaFraude");
      case PixDetalheTransacaoEnum.LiqDentroMesmoParticipanteSPI:
        return this.translateService.instant("pipe.pix_detalhe_transacao.LiqDentroMesmoParticipanteSPI");
      case PixDetalheTransacaoEnum.LiqMesmaInstAposTratamentoSuspeitaFraude:
        return this.translateService.instant("pipe.pix_detalhe_transacao.LiqMesmaInstAposTratamentoSuspeitaFraude");
      case PixDetalheTransacaoEnum.LiqMesmaInstSemTratamentoSuspeitaFraude:
        return this.translateService.instant("pipe.pix_detalhe_transacao.LiqMesmaInstSemTratamentoSuspeitaFraude");

      default:
        return "0";
    }
  }
}
