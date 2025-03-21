import { DecimalPipe } from '@angular/common';
import { PipeTransform, Inject, LOCALE_ID, Pipe } from '@angular/core';

@Pipe({ name: 'valorFinanceiro' })
export class ValorFinanceiroPipe extends DecimalPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private _qtd_locale: string) {
    super(_qtd_locale);
  }

  transform(value: any, digits?: string, locale?: string): string | null {
    return super.transform(value, '1.2-2', locale);
  }
}
