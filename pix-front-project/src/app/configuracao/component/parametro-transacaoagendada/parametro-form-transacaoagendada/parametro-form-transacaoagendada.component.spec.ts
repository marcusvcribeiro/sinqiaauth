import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametroFormTransacaoagendadaComponent } from './parametro-form-transacaoagendada.component';

describe('ParametroFormTransacaoagendadaComponent', () => {
  let component: ParametroFormTransacaoagendadaComponent;
  let fixture: ComponentFixture<ParametroFormTransacaoagendadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametroFormTransacaoagendadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametroFormTransacaoagendadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
