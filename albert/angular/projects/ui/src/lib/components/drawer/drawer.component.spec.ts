import { Component, EventEmitter, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrawerModule } from './drawer.module';
import { DrawerService } from './drawer.service';

describe('Drawer', () => {
  let pageSimpleFixture: ComponentFixture<PageSimpleComponent>;
  let pageWithDirectiveFixture: ComponentFixture<PageWithDirectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        DrawerModule
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

  it('Deve ser criado um Drawer', () => {
    pageSimpleFixture.componentInstance.drawerService.create({
      component: PageSimpleComponent,
    });

    pageSimpleFixture.detectChanges();

    const drawerElement = document.querySelector('.alb-drawer');

    expect(drawerElement).toBeTruthy();
  });

  it('Deve ser criado um Drawer com um título', () => {
    const title = 'Apenas um test';

    pageSimpleFixture.componentInstance.drawerService.create({
      component: PageSimpleComponent,
      title,
    });

    pageWithDirectiveFixture.detectChanges();

    const titleElement = document.querySelector('.alb-drawer-title');
    expect(titleElement.textContent.trim()).toEqual(title);
  });

  it('Deve ser criado um Drawer com a diretiva de título', () => {
    const title = 'Apenas um test';

    pageSimpleFixture.componentInstance.drawerService.create({
      component: PageWithDirectiveComponent,
    });

    pageSimpleFixture.detectChanges();

    const titleElement = document.querySelector('.alb-drawer-title');
    expect(titleElement.textContent.trim()).toEqual(title);

  });

  it('Quando a diretiva e propriedade de titulo for passado, a diretiva de titulo deve sobrescrever a propriedade', () => {
    pageSimpleFixture.componentInstance.drawerService.create({
      component: PageWithDirectiveComponent,
      title: 'Apenas um test 2',
    });

    pageSimpleFixture.detectChanges();
    pageWithDirectiveFixture.detectChanges();

    const titleElement = document.querySelector('.alb-drawer-title');
    expect(titleElement.textContent.trim()).toEqual('Apenas um test');
  });

  it('Deve possuír a diretiva de ações', () => {
    pageSimpleFixture.componentInstance.drawerService.create({
      component: PageWithDirectiveComponent,
    });

    pageWithDirectiveFixture.detectChanges();

    const actionElement = document.querySelector('.alb-drawer-actions');
    expect(actionElement.innerHTML).toBeTruthy();
  });

  it('O componente instanciado deve possuír Inputs', (done) => {
    const test = 'Hello world!';

    const drawer = pageSimpleFixture.componentInstance.drawerService.create({
      component: PageSimpleComponent,
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
    const drawer = pageSimpleFixture.componentInstance.drawerService.create({
      component: PageSimpleComponent,
    });
    pageSimpleFixture.detectChanges();

    drawer.then(({ component }) => {
      expect(component.instance.event instanceof EventEmitter).toBeTruthy();
      done();
    });
  });

  it('Deve fechar uma drawer', (done) => {

    pageSimpleFixture.componentInstance.drawerService.create({
      component: PageWithDirectiveComponent,
    });
    pageWithDirectiveFixture.detectChanges();
    pageWithDirectiveFixture.componentInstance.drawerService.close();

    pageSimpleFixture.whenRenderingDone().then(() => {
      pageWithDirectiveFixture.whenRenderingDone().then(() => {
        const element = document.querySelector('.alb-drawer');
        expect(!!element).toBeFalsy();
        done();
      });
    });
  });

  it('Deve fechar todas as drawers', (done) => {

    pageSimpleFixture.componentInstance.drawerService.create({
      component: PageWithDirectiveComponent,
    });
    pageWithDirectiveFixture.componentInstance.drawerService.create({
      component: PageWithDirectiveComponent,
    });
    pageWithDirectiveFixture.detectChanges();
    pageSimpleFixture.componentInstance.drawerService.closeAll();

    pageSimpleFixture.whenRenderingDone().then(() => {
      pageWithDirectiveFixture.whenRenderingDone().then(() => {
        const element = document.querySelector('.alb-drawer');
        expect(element).toBeFalsy();
        done();
      });
    });
  });

});

@Component({
  selector: 'app-simple-page',
  template: `
    <p>Hello Drawer!</p>
  `
})
class PageSimpleComponent {
  @Output() event = new EventEmitter();
  constructor(public drawerService: DrawerService) { }
}

@Component({
  selector: 'app-page-with-directive',
  template: `
  <h1 alb-drawer-title>Apenas um test</h1>
  <aside alb-drawer-actions>
    <button>Button 1</button>
  </aside>
  `
})
class PageWithDirectiveComponent {
  constructor(public drawerService: DrawerService) { }
}
