import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'canalMensagem'
})
export class CanalMensagemPipe implements PipeTransform {
  constructor(private translateService: TranslateService) { }
  transform(value: unknown): string {
    switch (value) {
      case 1:
        return this.translateService.instant('campo.canalMensagemPrimario');
      case 2:
        return this.translateService.instant('campo.canalMensagemSecundario');
      default:
        return '';
    }
  }
}
