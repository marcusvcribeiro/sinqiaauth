import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheOcorrenciaLogComponent } from './detalhe-ocorrencia-log.component';

describe('DetalheOcorrenciaLogComponent', () => {
  let component: DetalheOcorrenciaLogComponent;
  let fixture: ComponentFixture<DetalheOcorrenciaLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheOcorrenciaLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheOcorrenciaLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
