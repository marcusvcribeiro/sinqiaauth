import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DisplayGrid, GridsterConfig, GridsterItem, GridType } from 'angular-gridster2';
import { Dashboard } from '../../model/dashboard';
import { Widget } from '../../model/widget';

/**
 * @description
 * Componente de Dashboard-Page.
 * Serve como uma pagina de Dashboard, dentro da qual sera mostrado a lista de Widgets do Dashboard.
 */
@Component({
  selector: 'alb-dashboard-page',
  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent implements OnInit {

  /**
   * @description
   * Dashboard que sera utilizado na page.
   */
  @Input() dashboard: Dashboard;

  /**
   * @description
   * Evento para informar quando o Dashboard for alterado.
   */
  @Output() dashboardChanged = new EventEmitter<Dashboard>();

  /**
   * @description
   * Configuração do Gridster (biblioteca para exibir os widgets de forma a poder move-los pela tela).
   */
  options: GridsterConfig;

  constructor() {
  }

  ngOnInit(): void {
    this.createOptionsDashboard();
  }

  /**
   * @description
   * Método que cria a configuração do Gridster.
   */
  createOptionsDashboard() {
    this.options = {
      gridType: GridType.VerticalFixed,
      minCols: 4,
      minRows: 2,
      maxCols: 4,
      maxRows: 500,
      fixedRowHeight: 40,
      mobileBreakpoint: 0,
      displayGrid: DisplayGrid.None,
      disableWarnings: true,
      scrollToNewItems: true,
      draggable: {
        delayStart: 10,
        enabled: true,
        ignoreContentClass: 'alb-widget-content',
        ignoreContent: false,
        dragHandleClass: 'drag-handler',
      },
      itemChangeCallback: (item: GridsterItem) => this.updateWidgetDashboard(item),
      resizable: {
        delayStart: 0,
        enabled: true,
        handles: {
          s: false,
          e: false,
          n: false,
          w: true,
          se: true,
          ne: false,
          sw: false,
          nw: false
        }
      },
    };
  }

  /**
   * @description
   * Método atualiza um Widget do dashboard, sobrescrevendo sua posição, largura e altura com o que veio do evento do gridster.
   * Após atualizar as informações do Widget chama evento para indicar que o Dashboard foi alterado.
   */
  updateWidgetDashboard(item: GridsterItem) {
    const foundWidget: Widget = item.widget;
    if (foundWidget) {
      foundWidget.width = item.cols;
      foundWidget.height = item.rows;
      foundWidget.line = item.x;
      foundWidget.column = item.y;
      this.dashboardChanged.emit(this.dashboard);
    }
  }

  /**
   * @description
   * Método remove um Widget da lista de Widgets do Dashboard.
   * Após remover o Widget chama evento para indicar que o Dashboard foi alterado.
   */
  removeWidget(widget: Widget) {
    this.dashboard.widgets.splice(this.dashboard.widgets.indexOf(widget), 1);
    this.dashboardChanged.emit(this.dashboard);
  }

  /**
   * @description
   * Método que chama evento para indicar que o Dashboard foi alterado.
   */
  onWidgetChanged() {
    const dashboard = JSON.parse(JSON.stringify(this.dashboard));
    this.dashboardChanged.emit(dashboard);
  }
}
