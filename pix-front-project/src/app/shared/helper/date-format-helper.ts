import { format, parseISO } from 'date-fns';

export class DateFormatHelper {

  public static toUrlDate(date: string | Date): string {
    if (!date) {
      return null;
    }
    if (typeof date === 'string') {
      return date as string;
    }
    return format(date as Date, 'yyyy-MM-dd');
  }

  public static toUrlDateTime(date: string | Date): string {
    if (!date) {
      return null;
    }
    if (typeof date === 'string') {
      return date as string;
    }
    return format(date as Date, `yyyy-MM-dd'T'HH:mm:ss`);
  }

  public static toDateTimeWithTimezone(date: string | Date): string {
    if (!date) {
      return null;
    }

    if (typeof date === 'string') {
      date = new Date(date);
    }

    return format(date, `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`).toString();
  }

  public static fromUrlDate(value: string): Date {
    return parseISO(value as any);
  }

  public static fromIsoDate(value: string): string {
    return format(parseISO(value as any), 'dd/MM/yyyy');
  }

  public static fromIsoDateTime(value: string): string {
    return format(parseISO(value as any), 'dd/MM/yyyy HH:mm:ss');
  }

  public static fromIsoTime(value: string): string {
    return format(parseISO(value as any), 'HH:mm:ss');
  }

}
