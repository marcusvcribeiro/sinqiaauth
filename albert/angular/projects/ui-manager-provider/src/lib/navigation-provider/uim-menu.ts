export class UIMMenu {
  nome: string;
  tooltip?: string;
  uri?: string;
  menus?: UIMMenu[];
  icone?: string;
  click?: () => any;
  ordem?: number;
  tipo?: 'simple' | 'full';
  favorito?: boolean;
}
