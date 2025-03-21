import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGruposUsuariosComponent } from './lista-grupos-usuarios.component';

describe('ListaGruposUsuariosComponent', () => {
  let component: ListaGruposUsuariosComponent;
  let fixture: ComponentFixture<ListaGruposUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaGruposUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGruposUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
