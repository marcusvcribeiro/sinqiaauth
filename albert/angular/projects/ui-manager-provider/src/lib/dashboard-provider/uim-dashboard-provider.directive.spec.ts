import { DashboardComponent, DashboardModule } from '@albert/dashboard';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UIMProviderConfig } from '../uim-config';
import { UimDashboard, UimWidget } from './model';
import { UIMDashboardProviderDirective } from './uim-dashboard-provider.directive';

@Component({
  template: `
    <alb-dashboard #dashboard albUIMDashboardProvider></alb-dashboard>
  `
})
class TestComponent {
  @ViewChild('dashboard') dashboardComponent: DashboardComponent;
}

const uiManagerProviderConfigMockService = { url: 'dashboard/' } as UIMProviderConfig;
const httpMockService = {
  get: (url, options) => {
    if (url === 'dashboard/dashboards') {
      const dashboards: UimDashboard[] = [
        {
          nome: 'Dashboard A',
          id: 1,
          widgets: [
            {
              idDashboard: 1,
              idWidget: 1,
              altura: 3,
              largura: 2,
              linha: 1,
              coluna: 1
            }
          ]
        },
        {
          nome: 'Dashboard B',
          id: 2,
          widgets: [
            {
              idDashboard: 2,
              idWidget: 1,
              altura: 3,
              largura: 2,
              linha: 1,
              coluna: 1
            }
          ]
        }
      ];
      return of(dashboards);
    } else if (url === 'dashboard/widgets') {
      const widgets: UimWidget[] = [
        {
          id: 1,
          componente: 'M1Comp1',
          modulo: 'Module1',
          altura: 3,
          largura: 2,
          nome: 'M1Comp1',
          categoria: {
            id: 1,
            nome: 'A'
          }
        },
        {
          id: 2,
          componente: 'M1Comp2',
          modulo: 'Module1',
          altura: 3,
          largura: 2,
          nome: 'M1Comp2',
          categoria: {
            id: 1,
            nome: 'A'
          }
        },
        {
          id: 3,
          componente: 'M2Comp1',
          modulo: 'Module2',
          altura: 3,
          largura: 2,
          nome: 'M2Comp1',
          categoria: {
            id: 2,
            nome: 'B'
          }
        },
        {
          id: 4,
          componente: 'M2Comp2',
          modulo: 'Module2',
          altura: 3,
          largura: 2,
          nome: 'M2Comp2',
          categoria: {
            id: 3,
            nome: 'C'
          }
        },
        {
          id: 5,
          componente: 'M2Comp3',
          modulo: 'Module2',
          altura: 3,
          largura: 2,
          nome: 'M2Comp3',
          categoria: {
            id: 1,
            nome: 'A'
          }
        },
        {
          id: 6,
          componente: 'M3Comp1',
          modulo: 'Module3',
          altura: 3,
          largura: 2,
          nome: 'M3Comp1',
          categoria: {
            id: 2,
            nome: 'B'
          }
        },
        {
          id: 7,
          componente: 'M4Comp1',
          modulo: 'Module4',
          altura: 3,
          largura: 2,
          nome: 'M4Comp1',
          categoria: {
            id: 3,
            nome: 'C'
          }
        }
      ];
      return of(widgets);
    }
  },
  post: (url, body, httpOptions) => {
    console.log(body);
    return of();
  },
  put: (url, body, httpOptions) => {
    console.log(body);
    return of();
  },
  delete: (url, httpOptions) => {
    console.log(url);
    return of();
  }
} as HttpClient;

describe('UIMDashboardProviderDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UIMDashboardProviderDirective,
        TestComponent
      ],
      imports: [
        HttpClientModule,
        DashboardModule,
      ],
      providers: [
        { provide: UIMProviderConfig, useValue: uiManagerProviderConfigMockService },
        { provide: HttpClient, useValue: httpMockService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve ter dois dashboards', () => {
    expect(component.dashboardComponent.dashboards.length).toBe(2);
  });

  it('Cada Dashboard deve ter um widget', () => {
    expect(component.dashboardComponent.dashboards[0].widgets.length).toBe(1);
    expect(component.dashboardComponent.dashboards[1].widgets.length).toBe(1);
  });

  it('Dashboard deve ser valido', () => {
    expect(component.dashboardComponent.dashboards[0].id).toBe(1);
    expect(component.dashboardComponent.dashboards[0].name).toBe('Dashboard A');
  });

  it('Widget do dashboard deve ser valido', () => {
    expect(component.dashboardComponent.dashboards[0].widgets[0].idWidget).toBe(1);
    expect(component.dashboardComponent.dashboards[0].widgets[0].height).toBe(3);
    expect(component.dashboardComponent.dashboards[0].widgets[0].width).toBe(2);
    expect(component.dashboardComponent.dashboards[0].widgets[0].line).toBe(1);
    expect(component.dashboardComponent.dashboards[0].widgets[0].column).toBe(1);
    expect(component.dashboardComponent.dashboards[0].widgets[0].component).toBe('M1Comp1');
    expect(component.dashboardComponent.dashboards[0].widgets[0].module).toBe('Module1');
    expect(component.dashboardComponent.dashboards[0].widgets[0].name).toBe('M1Comp1');
    expect(component.dashboardComponent.dashboards[0].widgets[0].category.id).toBe(1);
    expect(component.dashboardComponent.dashboards[0].widgets[0].category.name).toBe('A');
  });

  it('Deve chamar serviço quando novo dashboard for cadastrado', () => {
    const log = spyOn(console, 'log');
    component.dashboardComponent.addDashboard('Dashboard 3');

    expect(log).toHaveBeenCalledWith(Object({ id: null, configuracao: undefined, nome: 'Dashboard 3', widgets: [] }));
  });

  it('Deve chamar serviço quando dashboard for alterado', () => {
    const log = spyOn(console, 'log');
    component.dashboardComponent.onDashboardChange({ id: 1, name: 'Dashboard 3', widgets: [] });

    expect(log).toHaveBeenCalledWith(Object({ id: 1, nome: 'Dashboard 3', configuracao: undefined, widgets: [] }));
  });

  it('Deve chamar serviço quando dashboard for excluido', () => {
    const log = spyOn(console, 'log');
    component.dashboardComponent.deleteDashboard({ id: 1, name: 'Dashboard 3', widgets: [] });

    expect(log).toHaveBeenCalledWith('dashboard/dashboards/1');
  });

});
