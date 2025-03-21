import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApuracaoDadosInformesBacenImportarDrawer } from './apuracao-dados-informes-bacen-importar-drawer.component';

describe('ApuracaoDadosInformesBacenImportarDrawer', () => {
  let component: ApuracaoDadosInformesBacenImportarDrawer;
  let fixture: ComponentFixture<ApuracaoDadosInformesBacenImportarDrawer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApuracaoDadosInformesBacenImportarDrawer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApuracaoDadosInformesBacenImportarDrawer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
