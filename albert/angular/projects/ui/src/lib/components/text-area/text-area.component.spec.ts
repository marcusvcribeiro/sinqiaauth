import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextAreaComponent } from './text-area.component';
import { TextAreaModule } from './text-area.module';


describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TextAreaModule,
      ],
      declarations: [
        FormInput,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaComponent);
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
    const label = nativeElement.querySelector('label');

    expect(placeholder).toBe(label.textContent);

  });

  it('Deve possuír um valor', () => {
    const value = 'Apenas um test';
    component.value = value;
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    const input = nativeElement.querySelector('textarea');

    expect(value).toBe(input.value);
  });


  it('Deve estar desabilitado', () => {
    component.disabled = true;
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    const isDisabled = nativeElement.querySelector('textarea').hasAttribute('disabled');

    expect(isDisabled).toBeTruthy();
  });

  it('Deve possuir value com FormGroup', () => {
    const fixtureFormInput = TestBed.createComponent(FormInput);
    fixtureFormInput.detectChanges();

    const input = fixtureFormInput.nativeElement.querySelector('textarea');
    expect(input.value).toEqual('Apenas um test');
  });

  it('Deve possuir uma validação com o FormGroup', () => {
    const fixtureFormInput = TestBed.createComponent(FormInput);
    const control = fixtureFormInput.componentInstance.form.controls.name;
    control.setValue('');
    fixtureFormInput.detectChanges();

    expect(control.valid).toBeFalsy();
  });

  it('Deve possuir um valor quando o Form Group é iniciado', () => {
    const fixtureFormInput = TestBed.createComponent(FormInput);
    const control = fixtureFormInput.componentInstance.form.controls.name;
    fixtureFormInput.detectChanges();

    expect(control.value).toBeTruthy();
  });

  it('Deve possuir numero de rows', () => {
    const fixtureFormInput = TestBed.createComponent(FormInput);
    const componentRef = fixtureFormInput.componentInstance;
    fixtureFormInput.detectChanges();
    expect(componentRef.textAreaForm.rows).toBe(5);
  });

  it('Deve possuir length', () => {
    const fixtureFormInput = TestBed.createComponent(FormInput);
    const componentRef = fixtureFormInput.componentInstance;
    fixtureFormInput.detectChanges();
    expect(componentRef.textAreaForm.length).toBe(500);
  });
});

@Component({
  template: `
    <form [formGroup]="form">
      <alb-textarea #textAreaForm formControlName="name" placeholder="Meu Text Area" [rows]="5" [length]="500"></alb-textarea>
      <button>Enviar</button>
    </form>
  `
})
class FormInput {
  @ViewChild(TextAreaComponent) textAreaForm: TextAreaComponent;

  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['Apenas um test', Validators.required]
    });
  }
}

