import { DashboardWidget } from './dashboard-widget';

export class Dashboard {
  id: number;
  nome: string;
  widgets: DashboardWidget[] = [];
}
