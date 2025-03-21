import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DrawerService } from '@albert/ui';
import { BoletagemConsultaService } from 'src/app/boletagem-consulta/service/boletagem.service';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { BoletoComponent } from './boleto.component';
import { SituacaoBoleto } from 'src/app/shared/model/enum/situacao-boleto';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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
fdescribe('BoletoComponent', () => {
    let component: BoletoComponent;
    let fixture: ComponentFixture<BoletoComponent>;
    let mockBoletagemConsultaService;
    let mockParametrosGlobaisService;
    let mockPixMessageService;
    let mockDrawerService;

    beforeEach(async () => {
        mockBoletagemConsultaService = jasmine.createSpyObj(['listarBoletoCampos', 'listarValoresBoleto', 'salvarMensagem', 'atualizarMensagem']);
        mockParametrosGlobaisService = jasmine.createSpyObj(['dataReferencia']);
        mockPixMessageService = jasmine.createSpyObj(['toastSuccess']);
        mockDrawerService = jasmine.createSpyObj(['close']);
        mockBoletagemConsultaService.listarBoletoCampos.and.returnValue(of({ tags: [], grupos: [] }));
        mockBoletagemConsultaService.listarValoresBoleto.and.returnValue(of({}));

        await TestBed.configureTestingModule({
            declarations: [BoletoComponent],
            imports: [SharedModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule],
            providers: [
                { provide: BoletagemConsultaService, useValue: mockBoletagemConsultaService },
                { provide: ParametrosGlobaisService, useValue: mockParametrosGlobaisService },
                { provide: PixMessageService, useValue: mockPixMessageService },
                { provide: DrawerService, useValue: mockDrawerService },
                { provide: TranslateService, useValue: translateServiceSpy }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BoletoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Deve criar o formcom valores default', () => {
        component.criarForm();
        expect(component.form).toBeTruthy();
        expect(component.form.controls['nomeModelo'].value).toBeNull();
        expect(component.form.controls['situacao'].value).toBeNull();
        expect(component.form.controls['dataMovimento'].value).toBeNull();
        expect(component.form.controls['canalMensagem'].value).toBe(1);
    });

    it('Deve marcar os campos obrigatorios como inválidos', () => {
        component.criarForm();
        const situacaoControl = component.form.controls['situacao'];
        const canalMensagemControl = component.form.controls['canalMensagem'];

        situacaoControl.setValue(null);
        canalMensagemControl.setValue(null);

        expect(situacaoControl.valid).toBeFalse();
        expect(canalMensagemControl.valid).toBeFalse();
    });

    it('Deve exibir o campo de nome do modelo quando alterar situacao', () => {
        component.criarForm();
        const situacaoControl = component.form.controls['situacao'];

        situacaoControl.setValue(SituacaoBoleto.MODELO);
        expect(component.mostrarNomeModelo).toBeTrue();

        situacaoControl.setValue(SituacaoBoleto.LIBERADA);
        expect(component.mostrarNomeModelo).toBeFalse();
    });

    it('deve resetar o campo de nome do modelo quando situacao alterada de Modelo', () => {
        component.criarForm();
        const situacaoControl = component.form.controls['situacao'];
        const nomeModeloControl = component.form.controls['nomeModelo'];

        situacaoControl.setValue(SituacaoBoleto.MODELO);
        nomeModeloControl.setValue('Test Model');
        expect(component.mostrarNomeModelo).toBeTrue();
        expect(nomeModeloControl.value).toBe('Test Model');

        situacaoControl.setValue(SituacaoBoleto.LIBERADA);
        expect(component.mostrarNomeModelo).toBeFalse();
        expect(nomeModeloControl.value).toBeNull();
    });
});