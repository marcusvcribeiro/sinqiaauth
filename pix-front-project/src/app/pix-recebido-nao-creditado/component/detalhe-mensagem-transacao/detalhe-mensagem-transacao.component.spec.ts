import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheMensagemTransacaoComponent } from './detalhe-mensagem-transacao.component';

describe('DetalheMensagemTransacaoComponent', () => {
  let component: DetalheMensagemTransacaoComponent;
  let fixture: ComponentFixture<DetalheMensagemTransacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheMensagemTransacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheMensagemTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
