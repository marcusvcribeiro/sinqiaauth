import { Component, DebugElement, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatetimepickerComponent } from './datetimepicker.component';
import { DatetimepickerModule } from './datetimepicker.module';

describe('DatetimepickerComponent', () => {
  let component: DatetimepickerComponent;
  let fixture: ComponentFixture<DatetimepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        DatetimepickerModule,
      ],
      declarations: [
        DatetimepickerForm,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve iniciar com uma data e hora válida (ISO 8601)', () => {
    component.value = '2020-03-09 12:03:39';
    component.ngOnChanges();
    fixture.detectChanges();

    const { nativeElement } = fixture.debugElement.query(By.css('.alb-datetimepicker-input'));
    const input: HTMLInputElement = nativeElement.querySelector('.alb-input-field');

    expect(input.value.trim()).toEqual('09/03/2020 12:03:39');
  });

  it('Deve iniciar com uma data e hora válida (instancia de Date)', () => {
    component.value = new Date(2020, 2, 9, 9, 20, 40);
    component.ngOnChanges();
    fixture.detectChanges();

    const { nativeElement } = fixture.debugElement.query(By.css('.alb-datetimepicker-input'));
    const input: HTMLInputElement = nativeElement.querySelector('.alb-input-field');

    expect(input.value.trim()).toEqual('09/03/2020 09:20:40');
  });


  it('Deve emitir o valor Datetimepicker, quando uma data válida for digitada', () => {
    const spy = spyOn(component.changeValue, 'emit');

    const { nativeElement } = fixture.debugElement.query(By.css('.alb-datetimepicker-input'));
    const input: HTMLInputElement = nativeElement.querySelector('.alb-input-field');

    input.value = '09/03/2019 09:02:12';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const dateTimePickerValue = {datetime: null, string: null};
    dateTimePickerValue.datetime = new Date(`2019-03-09 09:02:12`);
    dateTimePickerValue.string = '2019-03-09 09:02:12';

    expect(spy).toHaveBeenCalledWith(dateTimePickerValue);
  });

  it('Deve emitir o valor null caso o input esteja incompleto', () => {
    const spy = spyOn(component.changeValue, 'emit');

    component.onInputChange('20/02/20');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);

    component.onInputChange('20/02/2020 18:');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);

    component.onInputChange('20/02/20 12:1');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);

    component.onInputChange('20/02/20 16:04:1');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);
  });

  it('Deve emitir o valor vazio caso o input esteja com uma data hora invalida', () => {
    const spy = spyOn(component.changeValue, 'emit');

    component.onInputChange('40/02/2019 18:20:20');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);

    component.onInputChange('02/13/2019 18:20:20');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);

    component.onInputChange('02/02/9000 18:20:20');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);

    component.onInputChange('02/02/2020 23:20:20');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);

    component.onInputChange('02/02/2020 18:61:20');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);

    component.onInputChange('02/02/2020 18:20:62');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);
  });


  it('Deve possuír um valor com FormGroup', () => {
    const formComponent = TestBed.createComponent(DatetimepickerForm);
    formComponent.detectChanges();

    const { nativeElement } = formComponent.debugElement.query(By.css('.alb-datetimepicker-input'));
    const input: HTMLInputElement = nativeElement.querySelector('.alb-input-field');

    expect(input.value.trim()).toEqual('09/03/2020 09:02:12');
  });

  it('Deve emitir o valor Datetimepicker, quando uma data for selecionada pelo datetime', () => {
    const formComponent = TestBed.createComponent(DatetimepickerForm);
    formComponent.detectChanges();

    const button: HTMLElement = formComponent.debugElement.query(By.css('.alb-datetime-button')).nativeElement;
    button.click();
    formComponent.detectChanges();

    const dias: DebugElement[] = formComponent.debugElement.queryAll(By.css('.alb-datetime-calendar-day'));
    dias[0].nativeElement.click();
    const confirmButton = formComponent.debugElement.query(By.css('.alb-datetime-button-confirm')).nativeElement;
    confirmButton.click();

    formComponent.detectChanges();

    const valorElement = formComponent.debugElement.query(By.css('#valor')).nativeElement;

    const input: HTMLInputElement = formComponent.debugElement.query(By.css('.alb-input-field')).nativeElement;

    expect(input.value.trim().split(' ')[0]).toEqual('01/03/2020');
    expect(valorElement.textContent.trim().split(' ')[0]).toEqual('2020-03-01');
  });

  it('Deve emitir o valor Datetimepicker, quando uma data for selecionada pelo datetime com a hora', () => {
    const formComponent = TestBed.createComponent(DatetimepickerForm);
    formComponent.detectChanges();

    const button: HTMLElement = formComponent.debugElement.query(By.css('.alb-datetime-button')).nativeElement;
    button.click();
    formComponent.detectChanges();

    const dias: DebugElement[] = formComponent.debugElement.queryAll(By.css('.alb-datetime-calendar-day'));
    dias[0].nativeElement.click();

    const hora = formComponent.debugElement.query(By.css('.alb-datetime-clock-hour-am-3')).nativeElement;
    hora.click();
    formComponent.detectChanges();

    const minute = formComponent.debugElement.query(By.css('.alb-datetime-clock-minute-0')).nativeElement;
    minute.click();
    formComponent.detectChanges();

    const segundos = formComponent.debugElement.query(By.css('.alb-datetime-clock-second-20')).nativeElement;
    segundos.click();
    formComponent.detectChanges();

    const confirmButton = formComponent.debugElement.query(By.css('.alb-datetime-button-confirm')).nativeElement;
    confirmButton.click();

    formComponent.detectChanges();

    const valorElement = formComponent.debugElement.query(By.css('#valor')).nativeElement;

    const input: HTMLInputElement = formComponent.debugElement.query(By.css('.alb-input-field')).nativeElement;

    expect(input.value.trim()).toEqual('01/03/2020 03:00:20');
    expect(valorElement.textContent.trim()).toEqual('2020-03-01 03:00:20');
  });

  it('Não trocar a data caso o calendar seja aberto e fechado sem clicar em uma data', () => {
    const button: HTMLElement = fixture.debugElement.query(By.css('.alb-datetime-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const prev = fixture.debugElement.query(By.css('.alb-datetime-calendar-prev')).nativeElement;

    prev.click();
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.debugElement.query(By.css('.alb-input-field')).nativeElement;
    expect(input.value.trim()).toEqual('');
  });
});

@Component({
  template: `
    <form [formGroup]="form">
      <alb-datetimepicker placeholder="Apenas um datetimepicker" formControlName="date"></alb-datetimepicker>
      <span id="valor">{{form.get('date').value}}</span>
    </form>
  `
})
class DatetimepickerForm implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      date: ['2020-03-09 09:02:12', Validators.required]
    });
  }

  onDatetimeChange(date) {
  }
}
