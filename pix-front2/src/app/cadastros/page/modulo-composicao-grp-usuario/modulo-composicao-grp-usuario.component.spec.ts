import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloComposicaoGrpUsuarioComponent } from './modulo-composicao-grp-usuario.component';

describe('ModuloComposicaoGrpUsuarioComponent', () => {
  let component: ModuloComposicaoGrpUsuarioComponent;
  let fixture: ComponentFixture<ModuloComposicaoGrpUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloComposicaoGrpUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloComposicaoGrpUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
