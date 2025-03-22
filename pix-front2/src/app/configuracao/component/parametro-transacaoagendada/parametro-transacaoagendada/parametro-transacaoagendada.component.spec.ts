import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametroTransacaoagendadaComponent } from './parametro-transacaoagendada.component';

describe('ParametroTransacaoagendadaComponent', () => {
  let component: ParametroTransacaoagendadaComponent;
  let fixture: ComponentFixture<ParametroTransacaoagendadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametroTransacaoagendadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametroTransacaoagendadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
