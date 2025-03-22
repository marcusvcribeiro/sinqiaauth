import { MenuModule } from '@albert/ui';
import { PortalModule } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DisplayGrid, GridsterConfig, GridsterItem, GridsterModule, GridType } from 'angular-gridster2';
import { Widget } from '../../model/widget';
import { WidgetComponent } from '.';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: `
    <gridster [options]="options">
      <alb-widget [widget]="widget" (widgetRemoved)="removeWidget($event)"></alb-widget>
    </gridster>
    `
})
class TestComponent implements OnInit {
  widget: Widget = {
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
  };

  options: GridsterConfig;

  ngOnInit(): void {
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
      itemChangeCallback: (item: GridsterItem) => { },
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


  removeWidget(widget: Widget) {
    console.log(widget.idWidget);
  }
}


describe('WidgetComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MenuModule,
        PortalModule,
        GridsterModule,
        BrowserAnimationsModule
      ],
      declarations: [
        WidgetComponent,
        TestComponent
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

  it('Deve possuir Header, Menu de ações e Content', () => {
    const widgetHeader = fixture.debugElement.query(By.css('.alb-widget-header'));
    const widgetContent = fixture.debugElement.query(By.css('.alb-widget-content'));
    const widgetMenuAcoes = fixture.debugElement.query(By.css('.dashboard-template-tab-header-options'));

    expect(widgetHeader.nativeElement).toBeTruthy();
    expect(widgetContent.nativeElement).toBeTruthy();
    expect(widgetMenuAcoes.nativeElement).toBeTruthy();
  });

  it('Deve permitir fechar o widget', (done) => {
    const log = spyOn(console, 'log');
    const widgetMenuAcoes = fixture.debugElement.query(By.css('.alb-menu-span'));

    widgetMenuAcoes.nativeElement.click();
    fixture.detectChanges();

    const opcaoFechar = fixture.debugElement.parent.query(By.css('.alb-menu-list-item > span'));
    opcaoFechar.nativeElement.click();
    fixture.detectChanges();

    // setTimeout utilizados para aguardar as animações da página
    setTimeout(() => {
      expect(log).toHaveBeenCalledWith(1);
      done();
    }, 1000);
  });
});
