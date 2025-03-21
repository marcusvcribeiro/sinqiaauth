import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRecebedorEnderecoComponent } from './usuario-recebedor-endereco.component';

describe('UsuarioRecebedorEnderecoComponent', () => {
  let component: UsuarioRecebedorEnderecoComponent;
  let fixture: ComponentFixture<UsuarioRecebedorEnderecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioRecebedorEnderecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioRecebedorEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
