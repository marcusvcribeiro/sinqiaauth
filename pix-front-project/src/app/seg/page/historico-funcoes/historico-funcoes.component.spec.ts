import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoFuncoesComponent } from './historico-funcoes.component';

describe('HistoricoFuncoesComponent', () => {
  let component: HistoricoFuncoesComponent;
  let fixture: ComponentFixture<HistoricoFuncoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoFuncoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoFuncoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
