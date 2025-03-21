import { isDate } from 'date-fns';
import * as _moment from 'moment';

// TODO apagar quando entrar o albert
const moment = _moment;

export enum ValidacoesData {
  INVALIDA = 'dateInvalid',
  INFERIOR_MINIMA = 'dateMin',
  SUPERIOR_MAXIMA = 'dateMax'
}

// @dynamic
export class DateHelper {

  static formats = {
    parse: 'YYYY-MM-DD',
    display: 'DD/MM/YYYY',
    regex: /\d{4}-\d{2}-\d{2}/,
    empty: '__/__/____'
  };

  static isValidRange(date: Date, maxDate: Date, minDate: Date) {
    const newDate = moment(date, this.formats.display);
    if (!newDate.isValid()) {
      return ValidacoesData.INVALIDA;
    }

    let momentMinDate = moment(minDate, this.formats.parse);
    momentMinDate = momentMinDate.isValid() ? momentMinDate : moment(minDate);
    if (minDate && momentMinDate.isValid() && newDate.isBefore(momentMinDate)) {
      return ValidacoesData.INFERIOR_MINIMA;
    }

    let momentMaxDate = moment(maxDate, this.formats.parse);
    momentMaxDate = momentMaxDate.isValid() ? momentMaxDate : moment(maxDate);
    if (maxDate && momentMaxDate.isValid() && newDate.isAfter(momentMaxDate)) {
      return ValidacoesData.SUPERIOR_MAXIMA;
    }
  }

  static isDateEmpty(value: string): boolean {
    return (value === this.formats.empty);
  }

  static canBeParsedToDateTime(value: string): boolean {
    const regexDateTimeWithTimezone = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})|(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})/;

    return regexDateTimeWithTimezone.test(value);
  }

}
