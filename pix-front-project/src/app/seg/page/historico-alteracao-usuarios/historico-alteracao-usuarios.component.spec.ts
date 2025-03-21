import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoAlteracaoUsuarioComponent } from './historico-alteracao-usuarios.component';

describe('historico-alteracao-usuarios.component', () => {
  let component: HistoricoAlteracaoUsuarioComponent;
  let fixture: ComponentFixture<HistoricoAlteracaoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoAlteracaoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoAlteracaoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
