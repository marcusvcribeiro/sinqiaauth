import { Widget } from './widget';

export class Dashboard {
  id?: number | string;
  name?: string;
  configuration?: string;
  widgets?: Widget[];
}
