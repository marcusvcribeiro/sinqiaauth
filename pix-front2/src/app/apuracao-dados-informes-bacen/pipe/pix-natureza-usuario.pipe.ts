import { PixNaturezaUsuarioEnum } from "./../enum/pix-natureza-usuario.enum";
import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "pixNaturezaUsuario",
})
export class PixNaturezaUsuarioPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: PixNaturezaUsuarioEnum, ...args: any[]): string {
    switch (value) {
      case PixNaturezaUsuarioEnum.PessoaFisica:
        return this.translateService.instant("pipe.pix-natureza-usuario.pessoaFisica");
      case PixNaturezaUsuarioEnum.PessoaJuridica:
        return this.translateService.instant("pipe.pix-natureza-usuario.pessoaJuridica");
      default:
        return "";
    }
  }
}
