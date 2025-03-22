import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideToggleComponent } from './slide-toggle.component';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';

describe('SlideToggleComponent', () => {
  let component: SlideToggleComponent;
  let fixture: ComponentFixture<SlideToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlideToggleComponent, FormSlideToggle, FormSlideToggleArray],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve estar desabilitado', () => {
    component.disabled = true;

    fixture.detectChanges();

    const { nativeElement } = fixture.debugElement;

    const isDisabled = nativeElement.querySelector('input').hasAttribute('disabled');

    expect(isDisabled).toBeTruthy();
  });

  it('Deve possuir name', () => {
    component.name = 'slide-teste';

    fixture.detectChanges();

    const { nativeElement } = fixture.debugElement;

    const input = nativeElement.querySelector('input');

    expect(input.name).toBe('slide-teste');
  });

  it('Deve possuir aria-label', () => {
    component.ariaLabel = 'slide-teste';

    fixture.detectChanges();

    const { nativeElement } = fixture.debugElement;

    const hasAriaLabel = nativeElement.querySelector('input').hasAttribute('aria-label');

    expect(hasAriaLabel).toBeTruthy();
  });

  it('Deve possuir aria-labelledby', () => {
    component.ariaLabelledBy = 'label slide-teste-1';

    fixture.detectChanges();

    const { nativeElement } = fixture.debugElement;

    const hasAriaLabelledBy = nativeElement.querySelector('input').hasAttribute('aria-labelledby');

    expect(hasAriaLabelledBy).toBeTruthy();
  });

  it('Deve estar checked', () => {
    component.checked = true;

    fixture.detectChanges();

    const { nativeElement } = fixture.debugElement;

    const isChecked = nativeElement.querySelector('input:checked');

    expect(isChecked).toBeTruthy();
  });

  it('Deve possuir checked com FormControl', () => {
    const fixtureSlideToggle = TestBed.createComponent(FormSlideToggle);
    fixtureSlideToggle.detectChanges();

    const input = fixtureSlideToggle.nativeElement.querySelector('input');

    expect(input.checked).toEqual(true);
  });

  it('Deve possuir um valor quando o Form Group é iniciado', () => {
    const fixtureSlideToggle = TestBed.createComponent(FormSlideToggle);
    const control = fixtureSlideToggle.componentInstance.form.controls.isTeste;
    fixtureSlideToggle.detectChanges();

    expect(control.value).toBeTruthy();
  });

  it('Deve possuir checked com FormArray', () => {
    const fixtureSlideToggle = TestBed.createComponent(FormSlideToggleArray);
    fixtureSlideToggle.detectChanges();

    const input = fixtureSlideToggle.nativeElement.querySelector('input');

    expect(input.checked).toEqual(true);
  });
});

@Component({
  template: `
    <form [formGroup]="form">
      <alb-slide-toggle formControlName="isTeste"></alb-slide-toggle>
    </form>
  `
})
class FormSlideToggle {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      isTeste: [true]
    });
  }
}

@Component({
  template: `
    <form [formGroup]="form">
      <div formArrayName="isTeste" *ngFor="let toggle of toggles; let i = index">
        <alb-slide-toggle [formControlName]="i"></alb-slide-toggle>
      </div>
    </form>
  `
})
class FormSlideToggleArray {
  toggles = [{
    name: 'Slide 1',
    value: 'isChecked'
  }];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      isTeste: this.fb.array([true])
    });
  }
}
