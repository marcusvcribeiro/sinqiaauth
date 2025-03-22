import { Component, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioButtonModule } from './radio-button.module';


describe('RadioButton', () => {
  let fixture: ComponentFixture<RadioExample>;
  let component: RadioExample;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RadioButtonModule,
        ReactiveFormsModule,
      ],
      declarations: [
        RadioExample,
        CheckedRadioExample,
        DisabledRadioExample,
        FormRadioExample,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('O botão deve ser checado quando clicado', () => {
    const button = fixture.nativeElement.querySelector('input');
    button.click();
    fixture.detectChanges();

    const check = fixture.nativeElement.querySelectorAll('.alb-radio-checked');
    expect(check).toBeTruthy();
  });

  it('O botão deve ser alterado', () => {
    const [button1, button2] = fixture.nativeElement.querySelectorAll('input');

    button1.click();
    fixture.detectChanges();
    const check1 = fixture.nativeElement.querySelectorAll('.--checked');
    expect(check1.length).toBe(1);

    button2.click();
    fixture.detectChanges();
    const check2 = fixture.nativeElement.querySelectorAll('.--checked');
    expect(check2.length).toBe(1);

  });

  it('Deve iniciar com checked', () => {
    const fixtureCheckedRadio = TestBed.createComponent(CheckedRadioExample);
    fixtureCheckedRadio.detectChanges();

    const check = fixture.nativeElement.querySelectorAll('.alb-radio-checked');
    expect(check).toBeTruthy();
  });

  it('Deve iniciar com disabled', () => {
    const fixtureDisabledRadio = TestBed.createComponent(DisabledRadioExample);
    fixtureDisabledRadio.detectChanges();

    const disabled = fixtureDisabledRadio.nativeElement.querySelector('.alb-radio.--disabled');
    expect(disabled).toBeTruthy();
  });

  it('Deve possuir um Reacive Form com valor', () => {
    const fixtureFormRadio = TestBed.createComponent(FormRadioExample);
    fixtureFormRadio.detectChanges();

    const radio: HTMLInputElement = fixtureFormRadio.nativeElement.querySelector('.alb-radio-input');
    expect(radio.checked).toBeTruthy();
  });

  it('Deve possuir um Reacive Form desabilitado', () => {
    const fixtureFormRadio = TestBed.createComponent(FormRadioExample);
    fixtureFormRadio.detectChanges();

    const radio: HTMLElement = fixtureFormRadio.nativeElement.querySelector('.alb-radio.--disabled');
    expect(radio).toBeTruthy();
  });

});

@Component({
  template: `
    <alb-radio-group>
      <alb-radio-button class="radio1">Test 1</alb-radio-button>
      <alb-radio-button class="radio2">Test 2</alb-radio-button>
    </alb-radio-group>
  `
})
class RadioExample { }

@Component({
  template: `
    <alb-radio-group>
      <alb-radio-button [checked]="true">Test 1</alb-radio-button>
      <alb-radio-button>Test 2</alb-radio-button>
      <alb-radio-button>Test 3</alb-radio-button>
    </alb-radio-group>
  `
})
class CheckedRadioExample {}

@Component({
  template: `
    <alb-radio-group>
      <alb-radio-button *ngFor="let button of buttons" disabled>{{ button }}</alb-radio-button>
    </alb-radio-group>
  `
})
class DisabledRadioExample {
  buttons = ['One', 'Two', 'Three'];
}

@Component({
  template: `
    <form [formGroup]="form">
      <alb-radio-group formControlName="radio">
        <alb-radio-button [value]="1">Radio 1</alb-radio-button>
        <alb-radio-button [value]="2">Radio 2</alb-radio-button>
      </alb-radio-group>
    </form>
  `
})
class FormRadioExample implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      radio: [{value: 1, disabled: true}, Validators.required],
    });
  }
}
