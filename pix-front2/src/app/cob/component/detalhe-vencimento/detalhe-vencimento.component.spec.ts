import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheVencimentoComponent } from './detalhe-vencimento.component';

describe('DetalheVencimentoComponent', () => {
  let component: DetalheVencimentoComponent;
  let fixture: ComponentFixture<DetalheVencimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheVencimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheVencimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
