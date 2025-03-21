import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRecebedorCredenciaisComponent } from './usuario-recebedor-credenciais.component';

describe('UsuarioRecebedorCredenciaisComponent', () => {
  let component: UsuarioRecebedorCredenciaisComponent;
  let fixture: ComponentFixture<UsuarioRecebedorCredenciaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioRecebedorCredenciaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioRecebedorCredenciaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
