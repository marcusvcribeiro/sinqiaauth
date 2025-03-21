import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloAssociacaoAlcadaGrpUsuarioComponent } from './modulo-associacao-alcada-grp-usuario.component';

describe('ModuloAssociacaoAlcadaGrpUsuarioComponent', () => {
  let component: ModuloAssociacaoAlcadaGrpUsuarioComponent;
  let fixture: ComponentFixture<ModuloAssociacaoAlcadaGrpUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloAssociacaoAlcadaGrpUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloAssociacaoAlcadaGrpUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
