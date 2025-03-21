import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRecebedorListaComponent } from './usuario-recebedor-lista.component';

describe('UsuarioRecebedorListaComponent', () => {
  let component: UsuarioRecebedorListaComponent;
  let fixture: ComponentFixture<UsuarioRecebedorListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioRecebedorListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioRecebedorListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
