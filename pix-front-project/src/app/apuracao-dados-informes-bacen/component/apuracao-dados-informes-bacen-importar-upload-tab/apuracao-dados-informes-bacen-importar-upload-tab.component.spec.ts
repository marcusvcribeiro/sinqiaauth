import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApuracaoDadosInformesBacenImportarUploadTabComponent } from './apuracao-dados-informes-bacen-importar-upload-tab.component';

describe('ApuracaoDadosInformesBacenImportarUploadTabComponent', () => {
  let component: ApuracaoDadosInformesBacenImportarUploadTabComponent;
  let fixture: ComponentFixture<ApuracaoDadosInformesBacenImportarUploadTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApuracaoDadosInformesBacenImportarUploadTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApuracaoDadosInformesBacenImportarUploadTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
