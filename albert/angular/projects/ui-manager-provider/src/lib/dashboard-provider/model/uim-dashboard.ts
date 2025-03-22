import { UimDashboardWidget } from './uim-dashboard-widget';

export class UimDashboard {
  id: number;
  nome: string;
  configuracao?: string;
  widgets?: UimDashboardWidget[];
}
