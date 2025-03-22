import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NumberModule } from './number.module';
import { NumberComponent } from './number.component';

describe('NumberComponent', () => {
  let component: NumberComponent;
  let fixture: ComponentFixture<NumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        NumberModule,
      ],
      declarations: [
        NumberComponent,
        FormInput,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve possuír um placeholder', () => {
    const placeholder = 'Apenas um test';
    component.placeholder = placeholder;
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    const label = nativeElement.querySelector('.alb-input-label');

    expect(placeholder).toBe(label.textContent.trim());

  });

  it('Deve possuír um valor', () => {
    const value = 666.25;
    component.value = value;
    component.ngOnChanges();
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    const input = nativeElement.querySelector('input');
    expect('666,25').toBe(input.value);
  });


  it('Deve estar desabilitado', () => {
    component.disabled = true;
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    const isDisabled = nativeElement.querySelector('input').hasAttribute('disabled');

    expect(isDisabled).toBeTruthy();
  });

  it('Deve ser alinhado a direita', () => {
    component.textAlign = 'right';
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    const isAlignRight = nativeElement.querySelector('input').classList.contains('text-right');

    expect(isAlignRight).toBeTruthy();
  });

  it('Deve possuir value com FormGroup', () => {
    const fixtureFormInput = TestBed.createComponent(FormInput);
    fixtureFormInput.detectChanges();

    const input = fixtureFormInput.nativeElement.querySelector('input');
    expect(input.value).toEqual('1.234,25');
  });

  it('Deve possuir uma validação com o FormGroup', () => {
    const fixtureFormInput = TestBed.createComponent(FormInput);
    const control = fixtureFormInput.componentInstance.form.controls.number;
    control.setValue(null);
    fixtureFormInput.detectChanges();

    expect(control.valid).toBeFalsy();
  });

  it('Deve retornar tipo numérico com o FormGroup', () => {
    const fixtureFormInput = TestBed.createComponent(FormInput);
    const control = fixtureFormInput.componentInstance.form;
    control.get('number').setValue(12345);
    const numberValue = control.get('number').value;
    fixtureFormInput.detectChanges();

    expect(numberValue).toEqual(12345);
  });

  it('Deve possuir um valor quando o Form Group é iniciado', () => {
    const fixtureFormInput = TestBed.createComponent(FormInput);
    const control = fixtureFormInput.componentInstance.form.controls.number;
    fixtureFormInput.detectChanges();

    expect(control.value).toBeTruthy();
  });
});

@Component({
    template: `
      <form [formGroup]="form">
        <alb-number
            placeholder="Digite um número"
            decimal="true"
            length="5"
            decimalNumber="2"
            allowNegative
            formControlName="number">
        </alb-number>
        <button>Enviar</button>
      </form>
    `
})
class FormInput {
    form: FormGroup;
    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            number: [1234.25, Validators.required]
        });
    }
}
