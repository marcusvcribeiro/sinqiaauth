
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderAsyncComponent } from './loader-async.component';
import { LoaderAsyncModule } from './loader-async.module';


describe('LoaderAsyncComponent', () => {
  let component: LoaderAsyncComponent;
  let fixture: ComponentFixture<LoaderAsyncComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [LoaderAsyncModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderAsyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve estar visível se a propriedade loading for true', () => {
    component.loading = true;
    fixture.detectChanges();
    const loader: HTMLElement = fixture.nativeElement.querySelector('.alb-loader-async');
    expect(loader.hidden).toEqual(false);
  });

  it('Deve estar invisível se a propriedade loading for false', () => {
    component.loading = false;
    fixture.detectChanges();
    const loader: HTMLElement = fixture.nativeElement.querySelector('.alb-loader-async');
    expect(loader.hidden).toEqual(true);
  });

});
