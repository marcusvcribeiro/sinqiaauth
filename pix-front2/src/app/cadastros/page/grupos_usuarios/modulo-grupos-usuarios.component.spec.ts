import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloGruposUsuariosComponent } from './modulo-grupos-usuarios.component';

describe('ModuloGruposUsuariosComponent', () => {
  let component: ModuloGruposUsuariosComponent;
  let fixture: ComponentFixture<ModuloGruposUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloGruposUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloGruposUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
