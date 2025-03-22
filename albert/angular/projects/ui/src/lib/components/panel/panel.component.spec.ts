import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from './panel.module';
import { PanelService } from './panel.service';

describe('Panel', () => {
  let pageSimpleFixture: ComponentFixture<PageSimpleComponent>;
  let pageWithDirectiveFixture: ComponentFixture<PageWithDirectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        PanelModule
      ],
      declarations: [
        PageSimpleComponent,
        PageWithDirectiveComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    pageSimpleFixture = TestBed.createComponent(PageSimpleComponent);
    pageWithDirectiveFixture = TestBed.createComponent(PageWithDirectiveComponent);

    pageSimpleFixture.detectChanges();
    pageWithDirectiveFixture.detectChanges();
  });

  it('Deve ser criado um Panel', () => {
    pageSimpleFixture.componentInstance.panelService.create({
        anchorPoint: pageSimpleFixture.componentInstance.anchorPanel,
        component: PageSimpleComponent
    });

    pageSimpleFixture.detectChanges();

    const panelElement = document.querySelector('.alb-panel');

    expect(panelElement).toBeTruthy();
  });

  it('Deve possuír a diretiva de ações', () => {
    pageSimpleFixture.componentInstance.panelService.create({
      component: PageWithDirectiveComponent,
      anchorPoint: pageSimpleFixture.componentInstance.anchorPanel
    });

    pageWithDirectiveFixture.detectChanges();

    const actionElement = document.querySelector('.alb-panel-actions');
    expect(actionElement.innerHTML).toBeTruthy();
  });

  it('O componente instanciado deve possuír Inputs', (done) => {
    const test = 'Hello world!';

    const drawer = pageSimpleFixture.componentInstance.panelService.create({
      component: PageSimpleComponent,
      anchorPoint: pageSimpleFixture.componentInstance.anchorPanel,
      componentProps: {
        test,
      }
    });
    pageSimpleFixture.detectChanges();

    drawer.then(({ component }) => {
      expect(component.instance.test).toEqual(test);
      done();
    });
  });


  it('O componente instanciado deve possuír Outputs', (done) => {
    const drawer = pageSimpleFixture.componentInstance.panelService.create({
      component: PageSimpleComponent,
      anchorPoint: pageSimpleFixture.componentInstance.anchorPanel,
    });
    pageSimpleFixture.detectChanges();

    drawer.then(({ component }) => {
      expect(component.instance.event instanceof EventEmitter).toBeTruthy();
      done();
    });
  });

});

@Component({
  selector: 'app-simple-page',
  template: `
    <p>Hello Panel!</p>
    <div #anchor>Referência Panel</div>
  `
})
class PageSimpleComponent {
  @ViewChild('anchor', { read: ElementRef, static: true }) anchorPanel: ElementRef<any>;
  @Output() event = new EventEmitter();
  constructor(public panelService: PanelService) { }
}

@Component({
  selector: 'app-page-with-directive',
  template: `
  <aside alb-panel-actions>
    <button>Button 1</button>
  </aside>
  `
})
class PageWithDirectiveComponent {
  @ViewChild('anchor', { read: ElementRef, static: true }) anchorPanel: ElementRef<any>;
  constructor(public panelService: PanelService) { }
}
