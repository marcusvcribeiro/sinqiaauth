import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import IMask from 'imask';
import { InputComponent } from './input.component';
import { InputModule } from './input.module';



describe('InputComponent', () => {
  let component: InputComponent<IMask.AnyMaskedOptions>;
  let fixture: ComponentFixture<InputComponent<IMask.AnyMaskedOptions>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        InputModule,
      ],
      declarations: [
        FormInput,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
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

    expect(placeholder).toBe(label.textContent.trim());

  });

  it('Deve possuír um valor', () => {
    const value = 'Apenas um test';
    component.value = value;
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    const input = nativeElement.querySelector('input');

    expect(value).toBe(input.value);
  });

  it('Deve estar com valor do input vazio ao iniciar com value undefined', () => {
    const value = undefined;
    component.value = value;
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    const input = nativeElement.querySelector('input');

    expect(input.value).toBe('');
  });

  it('Deve ter a propriedade has-value false ao iniciar com value undefined', () => {
    const value = undefined;
    component.value = value;
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    const hasValue = nativeElement.querySelector('.has-value');

    expect(hasValue).toBeFalsy();
  });


  it('Deve ter a propriedade has-value false ao iniciar com value null', () => {
    const value = null;
    component.value = value;
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    const hasValue = nativeElement.querySelector('.has-value');

    expect(hasValue).toBeFalsy();
  });

  it('Deve estar desabilitado', () => {
    component.disabled = true;
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    const isDisabled = nativeElement.querySelector('input').hasAttribute('disabled');

    expect(isDisabled).toBeTruthy();
  });

  it('Deve ser readonly', () => {
    component.readonly = true;
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    const isReadonly = nativeElement.querySelector('input').hasAttribute('readonly');

    expect(isReadonly).toBeTruthy();
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

  it('Deve possuír uma máscara', () => {
    component.mask = { mask: '000-000' };
    component.value = '111111';
    fixture.detectChanges();
    component.ngAfterViewInit();

    const element = fixture.nativeElement.querySelector('.alb-input-field');
    expect(element.value).toEqual('111-111');
  });
});

@Component({
  template: `
    <form [formGroup]="form">
      <alb-input placeholder="Nome" formControlName="name"></alb-input>
      <button>Enviar</button>
    </form>
  `
})
class FormInput {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['Apenas um test', Validators.required]
    });
  }
}

