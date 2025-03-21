import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoParticipanteIndiretoListaComponent } from './acesso-participante-indireto-lista.component';

describe('AcessoParticipanteIndiretoListaComponent', () => {
  let component: AcessoParticipanteIndiretoListaComponent;
  let fixture: ComponentFixture<AcessoParticipanteIndiretoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcessoParticipanteIndiretoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcessoParticipanteIndiretoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
