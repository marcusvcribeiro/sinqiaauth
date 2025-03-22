export interface NavbarSimpleItem {
  name: string;
  icon?: string;
  path?: string;
  children?: NavbarSimpleItem[];
  onClick?: any;
  data?: any;
  favorite?: boolean;
}
