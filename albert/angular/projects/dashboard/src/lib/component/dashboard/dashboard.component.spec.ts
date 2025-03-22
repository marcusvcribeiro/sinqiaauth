import { InputModule, MenuModule, TabsModule } from '@albert/ui';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { GridsterModule } from 'angular-gridster2';
import { Dashboard } from '../../model/dashboard';
import { Widget } from '../../model/widget';
import { DashboardPageComponent } from '../dashboard-page/dashboard-page.component';
import { NewDashboardComponent } from '../new-dashboard';
import { NewWidgetComponent } from '../new-widget/new-widget.component';
import { WidgetComponent } from '../widget';
import { DashboardComponent } from './dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: `<alb-dashboard [dashboards]="dashboards"
                            [availableWidgets]="availableWidgets"
                            (dashboardAdded)="addDashboard($event)"
                            (dashboardChanged)="changeDashboard($event)"
                            (dashboardDeleted)="deleteDashboard($event)"
              ></alb-dashboard>`
})
class TestComponent {

  availableWidgets: Widget[] = [
    {
      idWidget: 1,
      component: 'M1Comp1',
      module: 'Module1',
      height: 3,
      width: 2,
      name: 'M1Comp1',
      category: {
        id: 1,
        name: 'A'
      }
    },
    {
      idWidget: 2,
      component: 'M1Comp2',
      module: 'Module1',
      height: 3,
      width: 2,
      name: 'M1Comp2',
      category: {
        id: 1,
        name: 'A'
      }
    },
    {
      idWidget: 3,
      component: 'M2Comp1',
      module: 'Module2',
      height: 3,
      width: 2,
      name: 'M2Comp1',
      category: {
        id: 2,
        name: 'B'
      }
    },
    {
      idWidget: 4,
      component: 'M2Comp2',
      module: 'Module2',
      height: 3,
      width: 2,
      name: 'M2Comp2',
      category: {
        id: 3,
        name: 'C'
      }
    },
    {
      idWidget: 5,
      component: 'M2Comp3',
      module: 'Module2',
      height: 3,
      width: 2,
      name: 'M2Comp3',
      category: {
        id: 1,
        name: 'A'
      }
    },
    {
      idWidget: 6,
      component: 'M3Comp1',
      module: 'Module3',
      height: 3,
      width: 2,
      name: 'M3Comp1',
      category: {
        id: 2,
        name: 'B'
      }
    },
    {
      idWidget: 7,
      component: 'M4Comp1',
      module: 'Module4',
      height: 3,
      width: 2,
      name: 'M4Comp1',
      category: {
        id: 3,
        name: 'C'
      }
    }
  ];

  dashboards: Dashboard[] = [
    {
      name: 'Dashboard A',
      id: 1,
      widgets: []
    },
    {
      name: 'Dashboard B',
      id: 2,
      widgets: []
    }
  ];

  addDashboard(dashboard: Dashboard) {
    console.log(`incluir dashboard: ${dashboard.id}`);
  }

  changeDashboard(dashboard: Dashboard) {
    console.log(`alterar dashboard: ${dashboard.id}`);
  }

  deleteDashboard(dashboard: Dashboard) {
    console.log(`excluir dashboard: ${dashboard.id}`);
  }
}

describe('DashboardComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        OverlayModule,
        TabsModule,
        MenuModule,
        ReactiveFormsModule,
        InputModule,
        GridsterModule,
        BrowserAnimationsModule
      ],
      declarations: [
        TestComponent,
        DashboardComponent,
        DashboardPageComponent,
        NewDashboardComponent,
        WidgetComponent,
        NewWidgetComponent
      ]})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve possuir titulo', () => {

    const headerItens = fixture.debugElement.query(By.css('.dashboard-header-title'));
    expect(headerItens.nativeElement.textContent).toBe('Dashboards');
  });

  it('Deve possuir botão para adicionar dashboard', () => {
    const headerItens = fixture.debugElement.query(By.css('.dashboard-tab-aside > button'));
    expect(headerItens.nativeElement).toBeTruthy();
  });

  it('Deve possuir 2 dashboards criados', () => {
    const headerItens = fixture.debugElement.queryAll(By.css('.header-item > div > span'));
    expect(headerItens[0].nativeElement.textContent).toBe('Dashboard A');
    expect(headerItens[1].nativeElement.textContent).toBe('Dashboard B');
  });

  it('Deve possuir menu de ação no dashboard selecionado', () => {
    const headerItens = fixture.debugElement.query(By.css('.header-item.--selected'));
    expect(headerItens.nativeElement).toBeTruthy();
  });

  it('Deve possibilitar adição de widget', (done) => {
    const menu = fixture.debugElement.queryAll(By.css('.alb-menu-span'))[1];
    menu.nativeElement.click();
    fixture.detectChanges();

    // setTimeout utilizados para aguardar as animações da página
    setTimeout(() => {
      const adicionarOption = fixture.debugElement.queryAll(By.css('.dashboard-template-tab-header-menu-item'))[0];
      expect(adicionarOption.nativeElement.textContent).toBe('Adicionar widget');

      adicionarOption.nativeElement.click();
      fixture.detectChanges();

      setTimeout(() => {
        const dashboardName = fixture.debugElement.parent.query(By.css('.alb-drawer-header > h2'));
        expect(dashboardName.nativeElement.textContent.trim()).toBe('Widgets');

        const widgets = fixture.debugElement.parent.queryAll(By.css('.alb-new-widget-card-add > button'));
        widgets[0].nativeElement.click();
        fixture.detectChanges();

        setTimeout(() => {
          expect(component.dashboards[1].widgets.length).toBe(1);
          done();
        });
      });
    });
  });

  it('Deve possibilitar exclusão de dashboard', (done) => {
    const menu = fixture.debugElement.queryAll(By.css('.alb-menu-span'))[1];
    menu.nativeElement.click();
    fixture.detectChanges();

    // setTimeout utilizados para aguardar as animações da página
    setTimeout(() => {
      const excluirOption = fixture.debugElement.queryAll(By.css('.dashboard-template-tab-header-menu-item'))[1];
      expect(excluirOption.nativeElement.textContent).toBe('Excluir dashboard');

      excluirOption.nativeElement.click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(component.dashboards.length).toBe(1);
        done();
      });
    });
  });

});
