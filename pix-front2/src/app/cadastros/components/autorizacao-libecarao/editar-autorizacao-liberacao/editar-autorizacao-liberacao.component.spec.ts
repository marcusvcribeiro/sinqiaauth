import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAutorizacaoLiberacaoComponent } from './editar-autorizacao-liberacao.component';

describe('EditarAutorizacaoLiberacaoComponent', () => {
  let component: EditarAutorizacaoLiberacaoComponent;
  let fixture: ComponentFixture<EditarAutorizacaoLiberacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarAutorizacaoLiberacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAutorizacaoLiberacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
