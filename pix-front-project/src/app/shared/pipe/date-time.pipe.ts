import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe extends DatePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private _qtd_locale: string) {
    super(_qtd_locale);
  }

  transform(value: any): string | null {
    if (value == null) {
      return '-';
    }
    const dateFormat = super.transform(value, 'shortDate');
    const dateTimeFormat = super.transform(value, 'HH:mm:ss');
    return `${dateFormat} ${dateTimeFormat}`;
  }
}
