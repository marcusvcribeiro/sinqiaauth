import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoComposicaoOperacaoComponent } from './selecao-composicao-operacao.component';

describe('SelecaoComposicaoOperacaoComponent', () => {
  let component: SelecaoComposicaoOperacaoComponent;
  let fixture: ComponentFixture<SelecaoComposicaoOperacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoComposicaoOperacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoComposicaoOperacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
