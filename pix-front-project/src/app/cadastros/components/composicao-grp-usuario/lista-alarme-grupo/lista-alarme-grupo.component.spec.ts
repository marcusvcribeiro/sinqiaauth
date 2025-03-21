import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlarmeGrupoComponent } from './lista-alarme-grupo.component';

describe('ListaAlarmeGrupoComponent', () => {
  let component: ListaAlarmeGrupoComponent;
  let fixture: ComponentFixture<ListaAlarmeGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAlarmeGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAlarmeGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
