import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { CheckBoxCompoent } from './checkbox.component';


describe('CheckBoxCompoent', () => {
  let component: CheckBoxCompoent;
  let fixture: ComponentFixture<CheckBoxCompoent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule],
      declarations: [
        CheckBoxCompoent,
        FormInput,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxCompoent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Checkbox deve possuír label', () => {
    const label = 'label checkbox';
    component.label = label;
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    const labelNative = nativeElement.querySelector('label');

    expect(label).toBe(labelNative.innerText);

  });

  it('Checkbox deve possuír input para value', () => {
    const value = true;
    component.value = value;
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    const input: HTMLInputElement = nativeElement.querySelector('input');

    expect(value).toBe(input.checked);
  });


  it('Checkbox deve estar disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    const isDisabled = nativeElement.querySelector('input').hasAttribute('disabled');

    expect(isDisabled).toBeTruthy();
  });


  it('Deve possuir value com FormGroup', () => {
    const fixtureFormInput = TestBed.createComponent(FormInput);
    fixtureFormInput.detectChanges();

    const input: HTMLInputElement = fixtureFormInput.nativeElement.querySelector('input');
    expect(input.checked).toEqual(false);
  });

  it(`Checkbox deve estar com propriedade 'Checked' falso e estar Enabled`, () => {
    const fixtureFormInput = TestBed.createComponent(FormInput);
    fixtureFormInput.detectChanges();

    const input: HTMLInputElement = fixtureFormInput.nativeElement.getElementsByTagName('input')[0];
    expect(input.checked).toEqual(false);
    expect(input.disabled).toEqual(false);
  });

  it(`Checkbox deve estar com propriedade 'Checked' falso e estar Disabled`, () => {
    const fixtureFormInput = TestBed.createComponent(FormInput);
    fixtureFormInput.detectChanges();

    const input: HTMLInputElement = fixtureFormInput.nativeElement.getElementsByTagName('input')[1];
    expect(input.checked).toEqual(false);
    expect(input.disabled).toEqual(true);
  });

  it(`Checkbox deve estar com propriedade 'Checked' verdadeiro e estar Enabled`, () => {
    const fixtureFormInput = TestBed.createComponent(FormInput);
    fixtureFormInput.detectChanges();

    const input: HTMLInputElement = fixtureFormInput.nativeElement.getElementsByTagName('input')[2];
    expect(input.checked).toEqual(true);
    expect(input.disabled).toEqual(false);
  });

  it(`Checkbox deve estar com propriedade 'Checked' verdadeiro e estar Disabled`, () => {
    const fixtureFormInput = TestBed.createComponent(FormInput);
    fixtureFormInput.detectChanges();

    const input: HTMLInputElement = fixtureFormInput.nativeElement.getElementsByTagName('input')[3];
    expect(input.checked).toEqual(true);
    expect(input.disabled).toEqual(true);
  });


  it(`Checkbox deve estar com propriedade 'Indeterminate'`, () => {
    const fixtureFormInput = TestBed.createComponent(FormInput);
    fixtureFormInput.detectChanges();

    const input: HTMLInputElement = fixtureFormInput.nativeElement.getElementsByTagName('input')[4];

    expect(input.indeterminate).toEqual(true);
  });

  it(`Checkbox deve estar com propriedade 'Indeterminate' igual a verdadeiro e estar Disabled`, () => {
    const fixtureFormInput = TestBed.createComponent(FormInput);
    fixtureFormInput.detectChanges();

    const input: HTMLInputElement = fixtureFormInput.nativeElement.getElementsByTagName('input')[5];
    expect(input.indeterminate).toEqual(true);
    expect(input.disabled).toEqual(true);
  });

  it(`Checkbox deve estar Disabled, sendo setado assim a partir do reactive form`, () => {
    const fixtureFormInput = TestBed.createComponent(FormInput);
    fixtureFormInput.detectChanges();

    const input = fixtureFormInput.nativeElement.getElementsByTagName('input')[7];
    expect(input.disabled).toEqual(true);
  });
});

@Component({
  template: `
    <form [formGroup]="form">
      <alb-checkbox formControlName="check1" label="check1"></alb-checkbox>
      <alb-checkbox formControlName="check2" label="check2"></alb-checkbox>
      <alb-checkbox formControlName="check3" label="check3"></alb-checkbox>
      <alb-checkbox formControlName="check4" label="check4"></alb-checkbox>
      <alb-checkbox formControlName="check5" label="check5" indeterminate></alb-checkbox>
      <alb-checkbox formControlName="check6" label="check6" indeterminate></alb-checkbox>
      <alb-checkbox formControlName="check7" label="check7"></alb-checkbox>
      <alb-checkbox formControlName="check8" label="check8"></alb-checkbox>
      <button>Enviar</button>
    </form>
  `
})
class FormInput {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      check1: [],
      check2: [{ value: false, disabled: true }],
      check3: [true],
      check4: [{ value: true, disabled: true }],
      check5: [true, [Validators.required]],
      check6: [{ value: false, disabled: true }],
      check7: [],
      check8: [{ value: false, disabled: true }]
    });
  }
}
