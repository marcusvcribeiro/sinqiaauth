// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormBuilder } from '@angular/forms';
// import { TranslateService } from '@ngx-translate/core';
// import { BoletagemConsultaService } from 'src/app/boletagem-consulta/service/boletagem.service';
// import { BoletagemListaComponent } from './consulta-transacoes-lista.component';
// import { of } from 'rxjs';
// import { UiModule } from '@albert/ui';
// import { SharedModule } from 'src/app/shared/shared.module';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// const translateServiceSpy = jasmine.createSpyObj(
//     'TranslateService',
//     [
//         'instant',
//         'get'
//     ],
//     {
//         'onTranslationChange': of({}),
//         'onLangChange': of({}),
//         'onDefaultLangChange': of({})
//     }
// );
// translateServiceSpy.get.and.returnValue(of('abc'));
// fdescribe('BoletagemListaComponent', () => {
//     let component: BoletagemListaComponent;
//     let fixture: ComponentFixture<BoletagemListaComponent>;
//     let boletagemServiceMock: any;

//     beforeEach(async () => {
//         boletagemServiceMock = jasmine.createSpyObj('BoletagemConsultaService', ['listarMensagem']);

//         await TestBed.configureTestingModule({
//             declarations: [BoletagemListaComponent],
//             imports: [SharedModule, UiModule, NoopAnimationsModule],
//             providers: [
//                 FormBuilder,
//                 { provide: BoletagemConsultaService, useValue: boletagemServiceMock },
//                 { provide: TranslateService, useValue: translateServiceSpy }
//             ]
//         }).compileComponents();
//     });

//     beforeEach(() => {
//         fixture = TestBed.createComponent(BoletagemListaComponent);
//         component = fixture.componentInstance;
//         component.filtro = { situacaoTransacao: 'someValue' } as any;
//         component.tipoBoletagem = 'someTipoBoletagem' as any;
//         component.ds = jasmine.createSpyObj('SinqiaDataSource', ['filter']);
//         fixture.detectChanges();
//     });
    
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     }
//     );
// });