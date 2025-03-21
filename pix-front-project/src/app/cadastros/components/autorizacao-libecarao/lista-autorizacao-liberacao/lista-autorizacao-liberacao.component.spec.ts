import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAutorizacaoLiberacaoComponent } from './lista-autorizacao-liberacao.component';

describe('ListaAutorizacaoLiberacaoComponent', () => {
  let component: ListaAutorizacaoLiberacaoComponent;
  let fixture: ComponentFixture<ListaAutorizacaoLiberacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAutorizacaoLiberacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAutorizacaoLiberacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
