import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloAutorizacaoLiberacaoComponent } from './modulo-autorizacao-liberacao.component';

describe('ModuloAutorizacaoLiberacaoComponent', () => {
  let component: ModuloAutorizacaoLiberacaoComponent;
  let fixture: ComponentFixture<ModuloAutorizacaoLiberacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloAutorizacaoLiberacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloAutorizacaoLiberacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
