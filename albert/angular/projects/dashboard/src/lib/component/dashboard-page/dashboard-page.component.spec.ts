import { ButtonModule, MenuModule } from '@albert/ui';
import { PortalModule } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridsterModule } from 'angular-gridster2';
import { Dashboard } from '../../model/dashboard';
import { WidgetComponent } from '../widget';
import { DashboardPageComponent } from './dashboard-page.component';

@Component({
  template: `
      <alb-dashboard-page [dashboard]="dashboard"
                          (dashboardChanged)="dashboardChanged($event)"></alb-dashboard-page>
    `
})
class TestComponent {
  dashboard: Dashboard = {
    id: 1,
    name: 'dashboard 1',
    widgets: [
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
      }
    ]
  };

  dashboardChanged(dashboard: Dashboard) {
    console.log(dashboard.id);
  }
}


describe('DashboardPageComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MenuModule,
        PortalModule,
        ButtonModule,
        GridsterModule,
        BrowserAnimationsModule
      ],
      declarations: [
        DashboardPageComponent,
        WidgetComponent,
        TestComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve possuir dois Widgets', () => {
    const widgets = fixture.debugElement.queryAll(By.css('.alb-widget'));

    expect(widgets.length).toBe(2);
  });

  it('Deve emitir evento de alteração de dashboard', (done) => {
    const log = spyOn(console, 'log');
    const widgetMenus = fixture.debugElement.queryAll(By.css('.alb-menu-span'));

    widgetMenus[1].nativeElement.click();
    fixture.detectChanges();

    // setTimeout utilizados para aguardar as animações da página
    setTimeout(() => {
      const widgetMenusFechar = fixture.debugElement.queryAll(By.css('.alb-menu-list-item > span'));

      widgetMenusFechar[0].nativeElement.click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(log).toHaveBeenCalledWith(1);
        expect(component.dashboard.widgets.length).toBe(1);
        expect(component.dashboard.widgets[0].idWidget).toBe(1);
        done();
      });
    });
  });
});
