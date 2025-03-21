import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRecebedorContatosComponent } from './usuario-recebedor-contatos.component';

describe('UsuarioRecebedorContatosComponent', () => {
  let component: UsuarioRecebedorContatosComponent;
  let fixture: ComponentFixture<UsuarioRecebedorContatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioRecebedorContatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioRecebedorContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
