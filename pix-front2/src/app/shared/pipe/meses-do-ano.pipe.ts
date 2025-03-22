import { MesesdoAnoEnum } from "./../model/enum/meses-do-ano.enum";
import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "mesesDoAno",
})
export class MesesDoAnoPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: MesesdoAnoEnum, ...args: any[]): string {
    switch (value) {
      case MesesdoAnoEnum.Janeiro:
        return this.translateService.instant("pipe.mesesdoano.janeiro");
      case MesesdoAnoEnum.Fevereiro:
        return this.translateService.instant("pipe.mesesdoano.fevereiro");
      case MesesdoAnoEnum.Marco:
        return this.translateService.instant("pipe.mesesdoano.marco");
      case MesesdoAnoEnum.Abril:
        return this.translateService.instant("pipe.mesesdoano.abril");
      case MesesdoAnoEnum.Maio:
        return this.translateService.instant("pipe.mesesdoano.maio");
      case MesesdoAnoEnum.Junho:
        return this.translateService.instant("pipe.mesesdoano.junho");
      case MesesdoAnoEnum.Julho:
        return this.translateService.instant("pipe.mesesdoano.julho");
      case MesesdoAnoEnum.Agosto:
        return this.translateService.instant("pipe.mesesdoano.agosto");
      case MesesdoAnoEnum.Setembro:
        return this.translateService.instant("pipe.mesesdoano.setembro");
      case MesesdoAnoEnum.Outubro:
        return this.translateService.instant("pipe.mesesdoano.outubro");
      case MesesdoAnoEnum.Novembro:
        return this.translateService.instant("pipe.mesesdoano.novembro");
      case MesesdoAnoEnum.Dezembro:
        return this.translateService.instant("pipe.mesesdoano.dezembro");

      default:
        return "";
    }
  }
}
