import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheConsultaCobrancaComponent } from './detalhe-consulta-cobranca.component';

describe('DetalheConsultaCobrancaComponent', () => {
  let component: DetalheConsultaCobrancaComponent;
  let fixture: ComponentFixture<DetalheConsultaCobrancaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheConsultaCobrancaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheConsultaCobrancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
