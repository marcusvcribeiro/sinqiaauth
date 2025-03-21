import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PixFonteReceitaEnum } from "../enum/pix-fonte-receita.enum";

@Pipe({
  name: "pixFonteReceita",
})
export class PixFonteReceitaPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: PixFonteReceitaEnum, ...args: any[]): string {
    switch (value) {
      case PixFonteReceitaEnum.IniciacaoPJ:
        return this.translateService.instant(
          "pipe.pix_fonte_receita.iniciacaoPj"
        );
      case PixFonteReceitaEnum.RecebimentoPF:
        return this.translateService.instant(
          "pipe.pix_fonte_receita.recebimentoPf"
        );
      case PixFonteReceitaEnum.RecebimentoPJ:
        return this.translateService.instant(
          "pipe.pix_fonte_receita.recebimentoPj"
        );

        default:
          return "";
    }
  }
}
