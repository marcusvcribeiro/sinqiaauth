import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionComponent } from './accordion.component';
import { By } from '@angular/platform-browser';

describe('Componente - AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccordionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve criar componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deve possuir um título', () => {
    const titulo = 'Título Teste';
    component.title = titulo;
    fixture.detectChanges();
    const labelTitle = fixture.debugElement.query(By.css('.alb-container-title')).nativeElement.textContent.trim();
    expect(labelTitle).toEqual(titulo);
  });

  it('Deve fechar o accordion', (done) => {
    component.open = true;

    const button = fixture.debugElement.nativeElement.querySelector('.alb-grid-icon');
    button.click();
    fixture.detectChanges();

    fixture.whenRenderingDone().then(() => {
      const closedContent = fixture.debugElement.query(By.css('.max-height-zero')).nativeElement;
      expect(!!closedContent).toEqual(true);
      done();
    });
  });

  it('Deve abrir o accordion', (done) => {
    component.open = false;

    const button = fixture.debugElement.nativeElement.querySelector('.alb-grid-icon');
    button.click();
    fixture.detectChanges();

    fixture.whenRenderingDone().then(() => {
      const openContent = fixture.debugElement.query(By.css('.max-height-max')).nativeElement;
      expect(!!openContent).toEqual(true);
      done();
    });
  });

});
