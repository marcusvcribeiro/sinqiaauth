import { Component, EventEmitter, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BottomSheetModule } from './bottom-sheet.module';
import { BottomSheetService } from './bottom-sheet.service';


describe('BottomSheetComponent', () => {
  let pageSimpleFixture: ComponentFixture<PageSimpleComponent>;
  let pageWithDirectiveFixture: ComponentFixture<PageWithDirectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        BottomSheetModule
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

  it('Deve ser criado um Bottom Sheet', () => {
    pageSimpleFixture.componentInstance.bottomSheetService.create({
      component: PageSimpleComponent,
    });
    pageSimpleFixture.detectChanges();

    const bottomSheetElement = document.querySelector('.alb-bottom-sheet');
    expect(bottomSheetElement).toBeTruthy();
    pageSimpleFixture.componentInstance.bottomSheetService.close();
  });

  it('Deve ser criado um Bottom Sheet com um título', () => {
    const title = 'Teste 1';
    pageSimpleFixture.componentInstance.bottomSheetService.create({
      component: PageSimpleComponent,
      title
    });
    pageWithDirectiveFixture.detectChanges();

    const titleElement = document.querySelector('.alb-bottom-sheet-title');
    expect(titleElement.textContent.trim()).toEqual(title);
    pageSimpleFixture.componentInstance.bottomSheetService.close();
  });

  it('Deve ser criado um Bottom Sheet com a diretiva de título', () => {
    const title = 'Teste com Diretiva';
    pageSimpleFixture.componentInstance.bottomSheetService.create({
      component: PageWithDirectiveComponent,
    });
    pageSimpleFixture.detectChanges();

    const titleElement = document.querySelector('.alb-bottom-sheet-title');
    expect(titleElement.textContent.trim()).toEqual(title);
    pageSimpleFixture.componentInstance.bottomSheetService.close();
  });

  it('Deve possuír a diretiva de ações', () => {
    pageSimpleFixture.componentInstance.bottomSheetService.create({
      component: PageWithDirectiveComponent,
    });
    pageWithDirectiveFixture.detectChanges();

    const actionElement = document.querySelector('.alb-bottom-sheet-actions');
    expect(actionElement.innerHTML).toBeTruthy();
    pageSimpleFixture.componentInstance.bottomSheetService.close();
  });

  it('Deve fechar o Bottom Sheet', (done) => {
    pageSimpleFixture.componentInstance.bottomSheetService.create({
      component: PageWithDirectiveComponent,
    });
    pageSimpleFixture.detectChanges();
    pageSimpleFixture.componentInstance.bottomSheetService.close();
    pageSimpleFixture.detectChanges();

    pageSimpleFixture.whenRenderingDone().then(() => {
      pageWithDirectiveFixture.whenRenderingDone().then(() => {
        const element = document.querySelector('.alb-bottom-sheet');
        expect(!!element).toBeFalsy();
        done();
      });
    });
  });

  it('O componente instanciado deve possuír Outputs', (done) => {
    const bottomSheet = pageSimpleFixture.componentInstance.bottomSheetService.create({
      component: PageSimpleComponent,
    });
    pageSimpleFixture.detectChanges();

    bottomSheet.then(({ component }) => {
      expect(component.instance.event instanceof EventEmitter).toBeTruthy();
      done();
    });
  });

  it('O componente instanciado deve possuír Inputs', (done) => {
    const test = 'Input Teste!';
    const bottomSheet = pageSimpleFixture.componentInstance.bottomSheetService.create({
      component: PageSimpleComponent,
      componentProps: {
        test,
      }
    });
    pageSimpleFixture.detectChanges();

    bottomSheet.then(({ component }) => {
      expect(component.instance.test).toEqual(test);
      done();
    });
  });


});

@Component({
  selector: 'app-simple-page',
  template: `
    <p>Hello Bottom Sheet!</p>
  `
})
class PageSimpleComponent {
  @Output() event = new EventEmitter();
  constructor(public bottomSheetService: BottomSheetService) { }
}

@Component({
  selector: 'app-page-with-directive',
  template: `
  <h1 alb-bottom-sheet-title>Teste com Diretiva</h1>
  <aside alb-bottom-sheet-actions>
    <button>Button 1</button>
  </aside>
  `
})
class PageWithDirectiveComponent {
  constructor(public bottomSheetService: BottomSheetService) { }
}
