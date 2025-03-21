import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'debitoCredito'
})
export class DebidoCreditoPipe implements PipeTransform {

  constructor(private translateService: TranslateService) {
  }

  transform(value: any): string | null {
    if (value === null || value === '') {
      return;
    }
    return value === 'D' ? this.translateService.instant('campo.debito') : this.translateService.instant('campo.credito');
  }
}
