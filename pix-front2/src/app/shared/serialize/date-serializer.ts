import { format } from 'date-fns';

export const DateSerializer = {
  Serialize(json: any): any {
    if (!!json && json instanceof Date) {
      return format(json, `yyyy-MM-dd'T'HH:mm:ss`);
    }
    return null;
  },
  Deserialize(json: any): any {
    if (json && typeof json === 'string') {
      return new Date(json.replace('Z', ''));
    }
    return null;
  }
};
