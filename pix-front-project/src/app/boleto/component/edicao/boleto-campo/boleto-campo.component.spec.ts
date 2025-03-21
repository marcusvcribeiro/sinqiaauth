import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletoCampoComponent } from './boleto-campo.component';
import { UiModule } from '@albert/ui';
import { SharedModule } from 'src/app/shared/shared.module';
import { BoletoTipoCampo } from 'src/app/shared/model/enum/boleto-tipo-campo';
import { BoletoClassificacaoCampo } from 'src/app/shared/model/enum/boleto-classificacao-campo';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { skip, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "teste-boleto-campo",
  template: `<ng-container [formGroup]="formTags"><app-boleto-campo [tag]="tag" [formControlName]="tag.id" [erro]="formTags.get(tag.id).touched && formTags.get(tag.id).errors"></app-boleto-campo></ng-container>`,
})
class CustomTestClass {
  checkValue = false;
  @ViewChild(BoletoCampoComponent) boletoCampoComponent: BoletoCampoComponent;
  formTags = new FormGroup({
    '1': new FormControl(''),
  });
  tag = {
    id: '1',
    tagPai: '1',
    campoObrigatorio: true,
    ordemCampo: 1,
    labelCampo: 'labelCampo',
    tipoCampo: BoletoTipoCampo.STRING,
    classificacaoCampo: BoletoClassificacaoCampo.ITEM_VALOR,
    qtdMinimaCaracter: 1,
    qtdMaximaCaracter: 1,
    dominioTags: [],
    atributoTags: [],
    qtdCasasDecimais: null,
    dscMascara: null,
    hash: null,
    idMascara: null,
    tagReadonly: false,
    tipoTag: 1,
    valorTag: null
  };
}

const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant']);
fdescribe('BoletoCampoComponent', () => {
  let component: BoletoCampoComponent;
  let fixture: ComponentFixture<CustomTestClass>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [UiModule, SharedModule, NoopAnimationsModule],
      declarations: [CustomTestClass, BoletoCampoComponent],
      providers: [
        { provide: TranslateService, useValue: translateServiceSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTestClass);
    component = fixture.componentInstance.boletoCampoComponent;
    fixture.detectChanges();
    component = fixture.componentInstance.boletoCampoComponent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`deve setar 'erro' como false quando evento de 'change' for chamado`, (done: DoneFn) => {
    const sub = component.valueChanged.subscribe((_: string) => {
      sub.unsubscribe();
      expect(component.erro).toBeFalse();
      done();
    });
    component.registerOnChange(jasmine.createSpy());
    component.change('teste');

    fixture.detectChanges();
  });

  it(`deve setar 'erro' como true quando evento de 'change' for chamado com tag com tamanho minimo e valor menor que este`, (done: DoneFn) => {
    const sub = component.valueChanged.subscribe((_: string) => {
      sub.unsubscribe();
      expect(component.erro).toBeTrue();
      done();
    });
    fixture.componentInstance.tag.qtdMinimaCaracter = 10;
    component.registerOnChange(jasmine.createSpy());
    component.change('teste');
    fixture.detectChanges();
  });

  it(`deve retornar 'erro' para false quando evento de 'change' for chamado com tag com tamanho minimo e valor maior ou igual a este`, (done: DoneFn) => {
    const sub1 = component.valueChanged.pipe(take(1)).subscribe((_: string) => {
      sub1.unsubscribe();
      expect(component.erro).toBeTrue();
    });
    
    const sub = component.valueChanged.pipe(skip(1)).subscribe((_: string) => {
      sub.unsubscribe();
      expect(component.erro).toBeFalse();
      done();
    });
    fixture.componentInstance.tag.qtdMinimaCaracter = 10;
    component.registerOnChange(jasmine.createSpy());
    component.change('teste');
    fixture.detectChanges();
    component.change('testeabcdef');
    fixture.detectChanges();
  });
});