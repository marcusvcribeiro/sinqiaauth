import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhePixNaoCreditadoComponent } from './detalhe-pix-nao-creditado.component';

describe('DetalhePixNaoCreditadoComponent', () => {
  let component: DetalhePixNaoCreditadoComponent;
  let fixture: ComponentFixture<DetalhePixNaoCreditadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhePixNaoCreditadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhePixNaoCreditadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
