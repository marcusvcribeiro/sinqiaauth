import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheLogOcorrenciaComponent } from './detalhe-log-ocorrencia.component';

describe('DetalheLogOcorrenciaComponent', () => {
  let component: DetalheLogOcorrenciaComponent;
  let fixture: ComponentFixture<DetalheLogOcorrenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheLogOcorrenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheLogOcorrenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
