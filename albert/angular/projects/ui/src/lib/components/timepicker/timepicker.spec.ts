import { Component, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimepickerComponent } from './timepicker.component';
import { TimepickerModule } from './timepicker.module';

describe('TimepickerComponent', () => {
  let component: TimepickerComponent;
  let fixture: ComponentFixture<TimepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        TimepickerModule,
      ],
      declarations: [
        TimepickerForm,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve iniciar com uma data válida (ISO 8601)', () => {
    component.value = '00:00:00';
    component.ngOnChanges();
    fixture.detectChanges();

    const { nativeElement } = fixture.debugElement.query(By.css('.alb-timepicker-input'));
    const input: HTMLInputElement = nativeElement.querySelector('.alb-input-field');

    expect(input.value.trim()).toEqual('00:00:00');
  });

  it('Deve iniciar com uma data válida (instancia de Date)', () => {
    component.value = new Date(2020, 2, 9, 12, 30, 49);
    component.ngOnChanges();
    fixture.detectChanges();

    const { nativeElement } = fixture.debugElement.query(By.css('.alb-timepicker-input'));
    const input: HTMLInputElement = nativeElement.querySelector('.alb-input-field');

    expect(input.value.trim()).toEqual('12:30:49');
  });


  it('Deve emitir o valor Timepicker, quando um horário válido é digitado', () => {
    const spy = spyOn(component.changeValue, 'emit');

    const { nativeElement } = fixture.debugElement.query(By.css('.alb-timepicker-input'));
    const input: HTMLInputElement = nativeElement.querySelector('.alb-input-field');

    input.value = '15:20:10';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const datePickerValue = { date: null, string: null };
    datePickerValue.date = new Date();
    datePickerValue.date.setHours(15);
    datePickerValue.date.setMinutes(20);
    datePickerValue.date.setSeconds(10);
    datePickerValue.string = '15:20:10';

    expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({
      string: '15:20:10',
      date: jasmine.any(Date),
    }));
    expect(component.hour).toEqual(15);
    expect(component.minute).toEqual(20);
    expect(component.second).toEqual(10);
    expect(component.second).toEqual(10);
    expect(component.textValue).toEqual('15:20:10');
  });

  it('Deve emitir o valor null caso o input não esteja completo', () => {
    const spy = spyOn(component.changeValue, 'emit');

    component.onInputChange('18');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);

    component.onInputChange('18:09');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);

    component.onInputChange('18:09:1');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);
  });

  it('Deve emitir o valor null caso o input esteja com um horario inválido', () => {
    const spy = spyOn(component.changeValue, 'emit');

    component.onInputChange('61:09:50');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);

    component.onInputChange('18:64:50');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);

    component.onInputChange('18:09:67');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);
  });

  it('Deve possuír um valor com FormGroup', () => {
    const formComponent = TestBed.createComponent(TimepickerForm);
    formComponent.detectChanges();

    const { nativeElement } = formComponent.debugElement.query(By.css('.alb-timepicker-input'));
    const input: HTMLInputElement = nativeElement.querySelector('.alb-input-field');

    expect(input.value.trim()).toEqual('23:45:35');
  });
});

@Component({
  template: `
    <form [formGroup]="form">
      <alb-timepicker placeholder="Apenas um timepicker" formControlName="date"></alb-timepicker>
    </form>
  `
})
class TimepickerForm implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      date: ['23:45:35', Validators.required]
    });
  }

  onDateChange(date) {
  }
}
