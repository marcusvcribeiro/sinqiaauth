import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoComposicaoAutorizacaoComponent } from './selecao-composicao-autorizacao.component';

describe('SelecaoComposicaoAutorizacaoComponent', () => {
  let component: SelecaoComposicaoAutorizacaoComponent;
  let fixture: ComponentFixture<SelecaoComposicaoAutorizacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoComposicaoAutorizacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoComposicaoAutorizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
