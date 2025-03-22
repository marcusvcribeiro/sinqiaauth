import { Dashboard, DashboardComponent, Widget } from '@albert/dashboard';
import { Directive, Host, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { HttpService } from '../http.service';
import { UimDashboard } from './model/uim-dashboard';
import { UimDashboardWidget } from './model/uim-dashboard-widget';
import { UimWidget } from './model/uim-widget';

/**
 * @description
 * Diretiva do UI-Manager-Dashboard-Provider.
 * Diretiva responsável por fazer a comunicação de um dashboard com o serviço do Ui-Manager, através de requisições Http Rest.
 * Com o uso dessa diretiva é possível fazer a comunicação de forma isolada sem interferir na implementação padrão do Dashboard.
 */
@Directive({
  selector: '[albUIMDashboardProvider]'
})
export class UIMDashboardProviderDirective implements OnDestroy, OnInit {

  /**
   * @description
   * Unsubscribe para fazer o unsubscribe de todas as resquisições feitas na diretiva quando ela for destruida.
   */
  private unsubscribe$ = new Subject();

  constructor(
    private httpService: HttpService,
    @Host() private dashboard: DashboardComponent) {
  }

  // override
  ngOnInit(): void {
    this.setDashboards();
    this.addDashboard();
    this.changeDashboard();
    this.deleteDashboard();
  }

  // override
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * @description
   * Método que faz a requisição para obter os Dashboards do usuário logado suas possibilidades de Widgets.
   * Quando as requisições terminam, cria os objetos do Dashboard e das opções de Widgets, a partir do resultado das requisições.
   */
  setDashboards() {
    const pathDashboard = 'dashboards';
    const pathWidgets = 'widgets';

    const dashboards$ = this.httpService.find<UimDashboard[]>(pathDashboard);
    const widgets$ = this.httpService.find<UimWidget[]>(pathWidgets);

    const combinedTimers = combineLatest([dashboards$, widgets$]);
    combinedTimers.subscribe(value => {
      const widgets = this.convertWidget(value[1]);
      const dashboards = this.convertDashboard(value[0], widgets);

      this.dashboard.availableWidgets = widgets;
      this.dashboard.dashboards = dashboards;
    });
  }

  /**
   * @description
   * Método que cria subscribe no evento de inclusão de Dashboard para chamar requisição de inclusão de Dashboard.
   */
  addDashboard() {
    const path = 'dashboards';
    this.dashboard.dashboardAdded.subscribe(dashboard => {
      this.httpService.post(path, this.convertUimDashboard(dashboard)).subscribe(v => this.setDashboards());
    });
  }

  /**
   * @description
   * Método que cria subscribe no evento de alteração de Dashboard para chamar requisição de alteração de Dashboard.
   */
  changeDashboard() {
    const path = 'dashboards';
    this.dashboard.dashboardChanged.subscribe(dashboard => {
      this.httpService.put(`${path}/${dashboard.id}`, this.convertUimDashboard(dashboard)).subscribe();
    });
  }

  /**
   * @description
   * Método que cria subscribe no evento de exclusão de Dashboard para chamar requisição de exclusão de Dashboard.
   */
  deleteDashboard() {
    const path = 'dashboards';
    this.dashboard.dashboardDeleted
      .subscribe(dashboard => this.httpService.delete(`${path}/${dashboard.id}`).subscribe(v => this.setDashboards()));
  }

  /**
   * @description
   * Método converter Widget do Ui-Manager para o padrão do Alb-Dashboard.
   */
  private convertWidget(uimWidgets: UimWidget[]): Widget[] {
    const widgets: Widget[] = [];
    uimWidgets.forEach(w => {
      widgets.push({
        idWidget: w.id,
        module: w.modulo,
        component: w.componente,
        name: w.nome,
        height: w.altura,
        width: w.largura,
        category: {
          icon: w.categoria.icone,
          id: w.categoria.id,
          name: w.categoria.nome
        }
      });
    });
    return widgets;
  }

  /**
   * @description
   * Método converter Dashboard do Ui-Manager para o padrão do Alb-Dashboard.
   */
  private convertDashboard(uimDashboards: UimDashboard[], availableWidgets: Widget[]): Dashboard[] {
    const dashboards: Dashboard[] = [];
    uimDashboards.forEach(d => {
      dashboards.push({
        id: d.id,
        name: d.nome,
        configuration: d.configuracao,
        widgets: this.convertDashboardWidget(d.widgets, availableWidgets)
      });
    });
    return dashboards;
  }

  /**
   * @description
   * Método converter DashboardWidgetO do Ui-Manager para o padrão do Alb-Dashboard.
   */
  private convertDashboardWidget(dashboardWidgets: UimDashboardWidget[], availableWidgets: Widget[]): Widget[] {
    const widgets: Widget[] = [];
    dashboardWidgets.forEach(dw => {
      availableWidgets.forEach(w => {
        if (dw.idWidget === w.idWidget) {
          const dashboardWidgetConvertido = { ...w };
          dashboardWidgetConvertido.height = dw.altura;
          dashboardWidgetConvertido.width = dw.largura;
          dashboardWidgetConvertido.line = dw.linha;
          dashboardWidgetConvertido.column = dw.coluna;
          dashboardWidgetConvertido.customData = this.extractConfiguration(dw.configuracao);
          widgets.push(dashboardWidgetConvertido);
        }
      });
    });
    return widgets;
  }

  private convertUimDashboard(dashboard: Dashboard): UimDashboard {
    const idDashboard = dashboard.id ? Number(dashboard.id) : null;
    return {
      id: isNaN(idDashboard) ? null : idDashboard,
      nome: dashboard.name,
      configuracao: dashboard.configuration,
      widgets: this.convertUimWidget(idDashboard, dashboard.widgets)
    };
  }

  private convertUimWidget(idDashboard: number, widgets: Widget[]): UimDashboardWidget[] {
    const uimWidgets: UimDashboardWidget[] = [];
    widgets.forEach(v => {
      const uimWidget = new UimDashboardWidget();
      uimWidget.idDashboard = idDashboard;
      uimWidget.idWidget = v.idWidget;
      uimWidget.linha = v.line;
      uimWidget.coluna = v.column;
      uimWidget.altura = v.height;
      uimWidget.largura = v.width;
      uimWidget.configuracao = v.customData ? JSON.stringify(v.customData) : null;
      uimWidgets.push(uimWidget);
    });
    return uimWidgets;
  }

  private extractConfiguration(config: string): any {
    return this.isJson(config) ? JSON.parse(config) : null;
  }

  private isJson(json: string) {
    try {
      JSON.parse(json);
    } catch (e) {
      return false;
    }
    return true;
  }
}
