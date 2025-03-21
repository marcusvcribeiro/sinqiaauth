import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosGrupoAdicionarComponent } from './usuarios-grupo-adicionar.component';

describe('UsuariosGrupoAdicionarComponent', () => {
  let component: UsuariosGrupoAdicionarComponent;
  let fixture: ComponentFixture<UsuariosGrupoAdicionarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosGrupoAdicionarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosGrupoAdicionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
