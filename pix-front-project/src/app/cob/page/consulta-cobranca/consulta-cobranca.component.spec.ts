import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCobrancaComponent } from './consulta-cobranca.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsultaCobrancaRoutingModule } from '../../consulta-cobranca-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SegurancaModule } from 'src/app/seg/seguranca.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { of } from 'rxjs';
import { ConsultaCobranca } from 'src/app/shared/model/consulta-cobranca';
import { ListResultCore } from 'src/app/shared/model/list-result';
import { By } from '@angular/platform-browser';


fdescribe('ConsultaCobrancaComponent', () => {
  let component: ConsultaCobrancaComponent;
  let fixture: ComponentFixture<ConsultaCobrancaComponent>;
  const translateServiceSpy = jasmine.createSpyObj(
    'TranslateService',
    [
      'instant',
      'get'
    ],
    {
      'onTranslationChange': of({}),
      'onLangChange': of({}),
      'onDefaultLangChange': of({})
    }
  );
  translateServiceSpy.get.and.returnValue(of('abc'));
  const oidcSecurityServiceSpy = jasmine.createSpyObj(
    'OidcSecurityService',
    {
      'authorizedCallbackWithCode': jasmine.createSpy(),
      'getIsAuthorized': of(true),
      'getUserData': of({}),
    },
    { 'moduleSetup': true }
  );
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, ConsultaCobrancaRoutingModule, FormsModule, ReactiveFormsModule,
        SegurancaModule, NoopAnimationsModule],
      declarations: [ConsultaCobrancaComponent],
      providers: [
        { provide: TranslateService, useValue: translateServiceSpy },
        { provide: OidcSecurityService, useValue: oidcSecurityServiceSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaCobrancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve deixar checkbox desabilitado quando tokenAcesso vazio mesmo com situacao de ERRO', (done) => {
    const listarCobrancaSpy = spyOn((component as any).consultaCobrancaService, 'listarCobrancas');
    listarCobrancaSpy.and.returnValue(of(<ListResultCore<ConsultaCobranca>>{
      content: [{
        txid: 'string',
        rev: 1,
        dtCriacaoCob: new Date(),
        vlrOriginal: 1,
        situacao: 'ERRO',
        tokenAcesso: null,
        dscTipCob: 'string',
        integracaoCob: 'string',
        flgApiPix: 'string',
        chvEnd: 'string',
        numCpfRec: 'string',
        usuRec: 'string',
        nomeRec: 'string',
        numCpfDev: 'string',
        nomeDev: 'string',
        solPag: 'string',
        dscCopiaCola: 'string',
        cepRec: 'string',
      }], total: 1
    }));

    component.pesquisar();
    fixture.detectChanges();
    fixture.whenStable().then(() => { 
      let checkboxes = fixture.debugElement.queryAll(By.css('alb-checkbox label input'));
      expect(checkboxes[1].nativeElement.disabled).toBe(true);
      done();
    });
  });

  it('Não deve chamar serviço para exibir aba abaixo da tela com detalhes', (done) => {
    const bottomSheetServiceSpy = spyOn((component as any).bottomSheetService, 'create');
    const ListarCobrancaSpy = spyOn((component as any).consultaCobrancaService, 'listarCobrancas');
    ListarCobrancaSpy.and.returnValue(of(<ListResultCore<ConsultaCobranca>>{
      content: [{
        txid: 'string',
        rev: 1,
        dtCriacaoCob: new Date(),
        vlrOriginal: 1,
        situacao: 'ERRO',
        tokenAcesso: null,
        dscTipCob: 'string',
        integracaoCob: 'string',
        flgApiPix: 'string',
        chvEnd: 'string',
        numCpfRec: 'string',
        usuRec: 'string',
        nomeRec: 'string',
        numCpfDev: 'string',
        nomeDev: 'string',
        solPag: 'string',
        dscCopiaCola: 'string',
        cepRec: 'string',
      }], total: 1
    }));

    component.pesquisar();
    fixture.detectChanges();
    fixture.whenStable().then(() => { 
      const coluna = fixture.debugElement.queryAll(By.css('td'));
      coluna[5].nativeElement.click();
      expect(bottomSheetServiceSpy).not.toHaveBeenCalled();
      done();
    });
  });
});
