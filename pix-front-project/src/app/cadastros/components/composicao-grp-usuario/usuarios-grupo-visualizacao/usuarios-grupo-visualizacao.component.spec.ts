import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosGrupoVisualizacaoComponent } from './usuarios-grupo-visualizacao.component';

describe('UsuariosGrupoVisualizacaoComponent', () => {
  let component: UsuariosGrupoVisualizacaoComponent;
  let fixture: ComponentFixture<UsuariosGrupoVisualizacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosGrupoVisualizacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosGrupoVisualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
