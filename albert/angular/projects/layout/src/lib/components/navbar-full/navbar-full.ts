export interface NavbarFullItem {
  id?: string;
  name: string;
  icon?: string;
  path?: string;
  children?: NavbarFullItem[];
  onClick?: any;
  data?: any;
  favorite?: boolean;
}
