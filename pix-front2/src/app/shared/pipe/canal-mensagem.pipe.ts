import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Pipe({
  name: 'canalMensagem'
})
export class CanalMensagemPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {
  }
  transform(value: any): string | null {
    if (value === null || value === '' || value === undefined) {
      return '';
    }
    if(value === 1) return this.translateService.instant('campo.canalMensagemPrimario');
    if(value === 2) return this.translateService.instant('campo.canalMensagemSecundario');
    return '';
  }
}
