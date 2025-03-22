import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApuracaoDadosInformesBacenImportarCadastroTabComponent } from './apuracao-dados-informes-bacen-importar-cadastro-tab.component';

describe('ApuracaoDadosInformesBacenImportarCadastroTabComponent', () => {
  let component: ApuracaoDadosInformesBacenImportarCadastroTabComponent;
  let fixture: ComponentFixture<ApuracaoDadosInformesBacenImportarCadastroTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApuracaoDadosInformesBacenImportarCadastroTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApuracaoDadosInformesBacenImportarCadastroTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
