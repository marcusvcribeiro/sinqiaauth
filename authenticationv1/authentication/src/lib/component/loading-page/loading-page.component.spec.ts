import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingPageComponent } from './loading-page.component';
import { LoaderModule } from '@albert/ui';


describe('LoadingPageComponent', () => {
  let component: LoadingPageComponent;
  let fixture: ComponentFixture<LoadingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingPageComponent],
      imports: [
        LoaderModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve possuír o texto indicado por input no label', () => {
    const label = 'label loading';
    component.label = label;
    fixture.detectChanges();

    const description: HTMLElement = fixture.nativeElement.querySelector('.alb-loading-page');
    expect(description.textContent.trim()).toEqual(label);
  });
});
