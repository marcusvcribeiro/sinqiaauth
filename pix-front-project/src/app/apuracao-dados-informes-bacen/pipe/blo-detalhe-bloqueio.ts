import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DetalheBloqueioEnum } from "../enum/bloq-detalhe-bloqueio.enum";

@Pipe({
  name: "bloDetalheBloqueio",
})
export class BloDetalheBloqueioPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: DetalheBloqueioEnum, ...args: any[]): string {
    switch (value) {
      case DetalheBloqueioEnum.BloProcessoAnaliseNaoConcluida:
        return this.translateService.instant(
          "pipe.blo_detalhe_bloqueio.BloProcessoAnaliseNaoConcluida"
        );
      case DetalheBloqueioEnum.BloProcessoAnaliseConcluida:
        return this.translateService.instant(
          "pipe.blo_detalhe_bloqueio.BloProcessoAnaliseConcluida"
        );
      case DetalheBloqueioEnum.BloMED:
        return this.translateService.instant(
          "pipe.blo_detalhe_bloqueio.BloMED"
        );
      case DetalheBloqueioEnum.BloProcessoDevolvidaAntesAnalise:
        return this.translateService.instant(
          "pipe.blo_detalhe_bloqueio.BloProcessoDevolvidaAntesAnalise"
        );


      default:
        return "";
    }
  }
}

// 1	Transações que foram bloqueadas cautelarmente, cujo processo de análise ainda não foi concluído
// 2	Transações que foram bloqueadas cautelarmente e foram liberadas para o usuário recebedor após análise
// 3	Transações que foram bloqueadas cautelarmente e resultaram em Mecanismo Especial de Devolução (MED) após análise
// 4	Transações que foram bloqueadas cautelarmente e foram devolvidas a pedido do usuário recebedor antes da conclusão do processo de análise
