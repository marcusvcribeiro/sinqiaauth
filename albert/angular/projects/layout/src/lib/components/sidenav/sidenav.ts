export class SidenavItem {
  id?: number;
  icon?: string;
  name?: string;
  path?: string;
  children?: SidenavItem[];
  onClick?: Function;
  data?: any;
}
