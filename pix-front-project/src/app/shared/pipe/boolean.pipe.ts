import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'booleano'
})
export class BooleanPipe implements PipeTransform {

  constructor(private translateService: TranslateService) {
  }

  transform(value: any): string | null {
    if (value) {
      return this.translateService.instant('campo.sim');
    }
    return this.translateService.instant('campo.sim');
  }

}
