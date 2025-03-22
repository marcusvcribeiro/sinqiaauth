import { DrawerService } from '@albert/ui';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Dashboard } from '../../model/dashboard';
import { Widget } from '../../model/widget';
import { NewDashboardComponent } from '../new-dashboard/new-dashboard.component';
import { NewWidgetComponent } from '../new-widget/new-widget.component';

/**
 * @description
 * Componente de Dashboard.
 */
@Component({
  selector: 'alb-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  /**
   * @description
   * Lista de Dashboards.
   */
  @Input() dashboards: Dashboard[] = [];

  /**
   * @description
   * Lista de opções de Widgets que podem ser criados.
   */
  @Input() availableWidgets: Widget[] = [];

  /**
   * @description
   * Evento para quando algum Dashboard novo é incluído na lista de Dashboards.
   */
  @Output() dashboardAdded: EventEmitter<Dashboard> = new EventEmitter();

  /**
   * @description
   * Evento para quando algum Dashboard existente na lista de Dashboards é alterado.
   */
  @Output() dashboardChanged: EventEmitter<Dashboard> = new EventEmitter();

  /**
   * @description
   * Evento para quando algum Dashboard é excluído da lista de Dashboards.
   */
  @Output() dashboardDeleted: EventEmitter<Dashboard> = new EventEmitter();

  /**
   * @description
   * Dashboard selecionado.
   * É o Dashboard que vai estar sendo exibido na tela.
   */
  selectedDashboard: Dashboard;


  constructor(private drawerService: DrawerService) {
  }

  /**
   * @description
   * Método que abre Drawer para permitir a inclusão de um novo Dashboard.
   */
  openDrawerNewDashboard() {
    const drawer = this.drawerService.create({
      component: NewDashboardComponent,
      title: 'Nome do Dashboard'
    });
    drawer.then(({ component }) => {
      component.instance.dashboardName.subscribe(dashboardName => this.addDashboard(dashboardName));
    });
  }

  /**
   * @description
   * Método adiciona um dashboard a lista de Dashboards existentes e na sequência emite um evento com o dashboard que foi adicionado.
   * Quando um Dashboard é criado ele recebe um Id randômico, e sua lista de Widgets é vazia.
   */
  addDashboard(dashboardName) {
    const dashboard = new Dashboard();
    dashboard.id = uuidv4();
    dashboard.name = dashboardName;
    dashboard.widgets = [];
    this.dashboards.push(dashboard);
    this.dashboardAdded.emit(dashboard);
    this.drawerService.close();
  }

  /**
   * @description
   * Método deixa um Dashboad selecionado, a partir do seu Id (caso o dashboard exista na lista de Dashboards criados).
   */
  dashboardSelected(idDashboard: number | string) {
    // setTimeout utilizado por conta da animação do tabs.
    setTimeout(() => this.selectedDashboard = this.dashboards.find(v => v.id === idDashboard));
  }

  /**
   * @description
   * Método para excluir um Dashboard.
   * Na sequência após remover o Dashboard da lista de Dashboards criado, emite um evento com o Dashboard que foi removido.
   */
  deleteDashboard(dashboard: Dashboard) {
    this.dashboards.splice(this.dashboards.indexOf(this.dashboards.find(v => v.id === dashboard.id)), 1);
    this.dashboardDeleted.emit(dashboard);
    this.selectedDashboard = null;
  }

  /**
   * @description
   * Método que abre Drawer para inclusão de Widget um Dashboard.
   * Após selecionar o Widget, chama método para adicionar o Widget no Dashboard selecionado.
   */
  openAddWidgetDrawer(dashboard: Dashboard) {
    const drawer = this.drawerService.create({
      component: NewWidgetComponent,
      title: 'Widgets',
      componentProps: {
        widgets: this.availableWidgets
      }
    });

    drawer.then(({ component }) => {
      component.instance.widgetSelected.subscribe(widget => this.addWidgetDashboard(dashboard, widget));
    });
  }

  /**
   * @description
   * Método que adiciona um Widget em um Dashboard.
   * Após adicionar o Widget, emite um evento com o Dashboard que foi alterado.
   */
  addWidgetDashboard(dashboard: Dashboard, widget: Widget) {
    dashboard.widgets.push(widget);
    this.drawerService.close();
  }

  /**
   * @description
   * Método que emite um evento com o Dashboard que foi alterado.
   */
  onDashboardChange(dashboard: Dashboard) {
    const dashboardCopy = JSON.parse(JSON.stringify(dashboard));
    this.dashboardChanged.emit(dashboardCopy);
  }

}
