import { PixMotivoRejeicaoEnum } from "./../enum/pix-motivo-rejeicao.enum";
import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "pixMotivoRejeicao",
})
export class PixMotivoRejeicaoPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: PixMotivoRejeicaoEnum, ...args: any[]): string {
    switch (value) {
      case PixMotivoRejeicaoEnum.NaoUtilizar:
        return this.translateService.instant("pipe.pix_motivo_rejeicao.naoUtilizar");
      case PixMotivoRejeicaoEnum.PagadorSancionado:
        return this.translateService.instant("pipe.pix_motivo_rejeicao.pagadorSancionado");
      case PixMotivoRejeicaoEnum.ProblemaAutenticacao:
        return this.translateService.instant("pipe.pix_motivo_rejeicao.problemaAutenticacao");
      case PixMotivoRejeicaoEnum.SuspeitaFraude:
        return this.translateService.instant("pipe.pix_motivo_rejeicao.suspeitaFraude");
      case PixMotivoRejeicaoEnum.Timeout:
        return this.translateService.instant("pipe.pix_motivo_rejeicao.timeout");
      default:
        return "";
    }
  }
}
