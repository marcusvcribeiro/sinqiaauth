import { PortalModule } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Widget } from '../../model/widget';
import { NewWidgetComponent } from './new-widget.component';
import { MenuModule, ButtonModule, TabsModule } from '@albert/ui';

@Component({
  template: `
      <alb-new-widget [widgets]="widgets" (widgetSelected)="widgetSelected($event)"></alb-new-widget>
    `
})
class TestComponent {
  widgets: Widget[] = [
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

  widgetSelected(widget: Widget) {
    console.log(widget.idWidget);
  }
}


describe('NewWidgetComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MenuModule,
        PortalModule,
        ButtonModule,
        TabsModule
      ],
      declarations: [
        NewWidgetComponent,
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

  it('Deve possuir Abas', () => {
    const widgetTabs = fixture.debugElement.queryAll(By.css('.header-item'));

    expect(widgetTabs.length).toBe(3);
    expect(widgetTabs[0].nativeElement.textContent.trim()).toBe('A');
    expect(widgetTabs[1].nativeElement.textContent.trim()).toBe('B');
    expect(widgetTabs[2].nativeElement.textContent.trim()).toBe('C');
  });

  it('Deve possuir lista de widgets', () => {
    const widgetItems = fixture.debugElement.queryAll(By.css('.alb-new-widget-card'));

    expect(widgetItems.length).toBe(3);
  });

  it('Item deve possuir Title e Button', () => {
    const widgetItemsTitle = fixture.debugElement.queryAll(By.css('.alb-new-widget-card > h2'));
    const widgetItemsButton = fixture.debugElement.queryAll(By.css('.alb-new-widget-card-add > button'));

    expect(widgetItemsTitle.length).toBe(3);
    expect(widgetItemsButton.length).toBe(3);
  });

  it('Titulo dos cards deve estar correto', () => {
    const widgetItemsTitle = fixture.debugElement.queryAll(By.css('.alb-new-widget-card > h2'));

    expect(widgetItemsTitle[0].nativeElement.textContent.trim()).toBe('M1Comp1');
    expect(widgetItemsTitle[1].nativeElement.textContent.trim()).toBe('M1Comp2');
    expect(widgetItemsTitle[2].nativeElement.textContent.trim()).toBe('M2Comp3');
  });

  it('Deve emitir o widget selecionado', (done) => {
    const log = spyOn(console, 'log');
    const widgetItemsButton = fixture.debugElement.queryAll(By.css('.alb-new-widget-card-add > button'));

    widgetItemsButton[1].nativeElement.click();
    fixture.detectChanges();

    // setTimeout utilizados para aguardar as animações da página
    setTimeout(() => {
      expect(log).toHaveBeenCalledWith(2);
      done();
    }, 1000);
  });
});
