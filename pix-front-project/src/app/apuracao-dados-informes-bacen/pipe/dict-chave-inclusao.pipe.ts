import { TranslateService } from "@ngx-translate/core";
import { DictChaveInclusaoEnum } from "./../enum/dict-chave-inclusao.enum";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dictChaveInclusao",
})
export class DictChaveInclusaoPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: DictChaveInclusaoEnum, ...args: any[]): string {
    switch (value) {
      case DictChaveInclusaoEnum.Aleatoria:
        return this.translateService.instant(
          "pipe.dict_chave_inclusao.aleatoria"
        );
      case DictChaveInclusaoEnum.Cnpj:
        return this.translateService.instant("pipe.dict_chave_inclusao.cnpj");
      case DictChaveInclusaoEnum.Cpf:
        return this.translateService.instant("pipe.dict_chave_inclusao.cpf");
      case DictChaveInclusaoEnum.Email:
        return this.translateService.instant("pipe.dict_chave_inclusao.email");
      case DictChaveInclusaoEnum.Telefone:
        return this.translateService.instant(
          "pipe.dict_chave_inclusao.telefone"
        );
      default:
        return "";
    }
  }
}
