import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApuracaoDadosInformesBacenGerarDrawerComponent } from './apuracao-dados-informes-bacen-gerar-drawer.component';

describe('ApuracaoDadosInformesBacenGerarDrawerComponent', () => {
  let component: ApuracaoDadosInformesBacenGerarDrawerComponent;
  let fixture: ComponentFixture<ApuracaoDadosInformesBacenGerarDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApuracaoDadosInformesBacenGerarDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApuracaoDadosInformesBacenGerarDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
