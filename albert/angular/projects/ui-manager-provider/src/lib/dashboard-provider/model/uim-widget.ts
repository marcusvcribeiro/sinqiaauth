import { UimCategoriaWidget } from './uim-categoria-widget';

export class UimWidget {
  id: number;
  modulo: string;
  componente: string;
  descricao?: string;
  nome?: string;
  altura?: number;
  largura?: number;
  categoria?: UimCategoriaWidget;
}
