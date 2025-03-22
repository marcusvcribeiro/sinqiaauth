export interface NavigationItem {
  id?: string;
  name: string;
  icon?: string;
  path?: string;
  children?: NavigationItem[];
  type?: 'simple' | 'full';
  onClick?: any;
  data?: any;
  favorite?: boolean;
  changeTabTitle?: boolean;
}
