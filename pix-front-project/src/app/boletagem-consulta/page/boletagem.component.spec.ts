import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BoletagemComponent } from './boletagem.component';
import { BoletagemConsultaService } from '../service/boletagem.service';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import { DialogService, ToastService, DrawerService, UiModule } from '@albert/ui';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('BoletagemComponent', () => {
  let component: BoletagemComponent;
  let fixture: ComponentFixture<BoletagemComponent>;
  let boletagemService: jasmine.SpyObj<BoletagemConsultaService>;
  let parametrosGlobaisService: jasmine.SpyObj<ParametrosGlobaisService>;

  beforeEach(async(() => {
    const boletagemServiceSpy = jasmine.createSpyObj('BoletagemConsultaService', ['gerarPDF', 'exportarExcel']);
    const parametrosGlobaisServiceSpy = jasmine.createSpyObj('ParametrosGlobaisService', ['dataReferencia']);

    TestBed.configureTestingModule({
      declarations: [BoletagemComponent],
      imports: [ReactiveFormsModule, TranslateModule.forRoot(), UiModule, SharedModule, NoopAnimationsModule],
      providers: [
        { provide: BoletagemConsultaService, useValue: boletagemServiceSpy },
        { provide: ParametrosGlobaisService, useValue: parametrosGlobaisServiceSpy },
        DialogService,
        ToastService,
        DrawerService,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});