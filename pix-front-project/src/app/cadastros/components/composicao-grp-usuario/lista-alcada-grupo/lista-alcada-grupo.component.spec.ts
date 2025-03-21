import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlcadaGrupoComponent } from './lista-alcada-grupo.component';

describe('ListaAlcadaGrupoComponent', () => {
  let component: ListaAlcadaGrupoComponent;
  let fixture: ComponentFixture<ListaAlcadaGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAlcadaGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAlcadaGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
