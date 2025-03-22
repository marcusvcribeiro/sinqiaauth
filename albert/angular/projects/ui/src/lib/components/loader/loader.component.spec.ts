
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { LoaderModule } from './loader.module';


describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [ LoaderModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve possuír uma descrição', () => {
    const text = 'Carregando...';
    component.description = text;
    fixture.detectChanges();
    const description: HTMLElement = fixture.nativeElement.querySelector('.alb-loader-description');
    expect(description.textContent.trim()).toEqual(text);
  });

  it('Deve possuír a classe de estilo light', () => {
    component.type = 'light';
    fixture.detectChanges();
    const hasLight = fixture.nativeElement.classList.contains('--light');
    expect(hasLight).toBeTruthy();
  });

  it('Deve possuír a classe de estilo dark', () => {
    component.type = 'dark';
    fixture.detectChanges();
    const hasLight = fixture.nativeElement.classList.contains('--dark');
    expect(hasLight).toBeTruthy();
  });

});
