import { WidgetCategory } from './widget-category';


export class Widget {
  idWidget: number;
  module: string;
  component: string;
  description?: string;
  name?: string;
  height?: number;
  width?: number;
  column?: number;
  line?: number;
  category?: WidgetCategory;
  customData?: any;
}
