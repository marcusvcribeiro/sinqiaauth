import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasFraudesDetalhesComponent } from './consultas-fraudes-detalhes.component';

describe('ConsultasFraudesDetalhesComponent', () => {
  let component: ConsultasFraudesDetalhesComponent;
  let fixture: ComponentFixture<ConsultasFraudesDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultasFraudesDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultasFraudesDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
