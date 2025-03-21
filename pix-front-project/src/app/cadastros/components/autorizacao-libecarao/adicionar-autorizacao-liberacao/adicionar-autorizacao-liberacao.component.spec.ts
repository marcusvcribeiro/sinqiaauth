import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarAutorizacaoLiberacaoComponent } from './adicionar-autorizacao-liberacao.component';

describe('AdicionarAutorizacaoLiberacaoComponent', () => {
  let component: AdicionarAutorizacaoLiberacaoComponent;
  let fixture: ComponentFixture<AdicionarAutorizacaoLiberacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarAutorizacaoLiberacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarAutorizacaoLiberacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
