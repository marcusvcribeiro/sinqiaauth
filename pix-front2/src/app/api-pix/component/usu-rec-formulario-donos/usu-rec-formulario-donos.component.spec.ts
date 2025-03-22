import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuRecFormularioDonosComponent } from './usu-rec-formulario-donos.component';

describe('UsuRecFormularioDonosComponent', () => {
  let component: UsuRecFormularioDonosComponent;
  let fixture: ComponentFixture<UsuRecFormularioDonosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuRecFormularioDonosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuRecFormularioDonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
