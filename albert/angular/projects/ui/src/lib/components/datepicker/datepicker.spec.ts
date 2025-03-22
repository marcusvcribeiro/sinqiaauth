import { Component, DebugElement, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatepickerComponent } from './datepicker.component';
import { DatepickerModule } from './datepicker.module';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        DatepickerModule,
      ],
      declarations: [
        DatepickerForm,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve iniciar com uma data válida (ISO 8601)', () => {
    component.value = '2020-03-09';
    component.ngOnChanges();
    fixture.detectChanges();

    const { nativeElement } = fixture.debugElement.query(By.css('.alb-datepicker-input'));
    const input: HTMLInputElement = nativeElement.querySelector('.alb-input-field');

    expect(input.value.trim()).toEqual('09/03/2020');
  });

  it('Deve iniciar com uma data válida (instancia de Date)', () => {
    component.value = new Date(2020, 2, 9);
    component.ngOnChanges();
    fixture.detectChanges();

    const { nativeElement } = fixture.debugElement.query(By.css('.alb-datepicker-input'));
    const input: HTMLInputElement = nativeElement.querySelector('.alb-input-field');

    expect(input.value.trim()).toEqual('09/03/2020');
  });


  it('Deve emitir o valor Datepicker, quando uma data válida é digitada', () => {
    const spy = spyOn(component.changeValue, 'emit');

    const { nativeElement } = fixture.debugElement.query(By.css('.alb-datepicker-input'));
    const input: HTMLInputElement = nativeElement.querySelector('.alb-input-field');

    input.value = '09/03/2019';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const datePickerValue = {date: null, string: null};
    datePickerValue.date = new Date(`2019-03-09 00:00:00`);
    datePickerValue.string = '2019-03-09';

    expect(spy).toHaveBeenCalledWith(datePickerValue);
  });

  it('Deve emitir o valor vazio caso o input não esteja completo', () => {
    const spy = spyOn(component.changeValue, 'emit');

    component.onInputChange('20/02/20');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);
  });

  it('Deve emitir o valor vazio caso o input esteja com uma data inválida', () => {
    const spy = spyOn(component.changeValue, 'emit');

    component.onInputChange('40/02/2019');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);

    component.onInputChange('02/13/2019');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);

    component.onInputChange('02/02/9000');
    fixture.detectChanges();

    component.focusOut();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(null);
  });

  it('Deve possuír um valor com FormGroup', () => {
    const formComponent = TestBed.createComponent(DatepickerForm);
    formComponent.detectChanges();

    const { nativeElement } = formComponent.debugElement.query(By.css('.alb-datepicker-input'));
    const input: HTMLInputElement = nativeElement.querySelector('.alb-input-field');

    expect(input.value.trim()).toEqual('09/03/2020');
  });

  it('Trocar de data utilizando o calendar', () => {
    const formComponent = TestBed.createComponent(DatepickerForm);
    formComponent.detectChanges();

    const button: HTMLElement = formComponent.debugElement.query(By.css('.alb-calendar-button')).nativeElement;
    button.click();
    formComponent.detectChanges();

    const dias: DebugElement[] = formComponent.debugElement.queryAll(By.css('.alb-calendar-day'));

    dias[0].nativeElement.click();
    formComponent.detectChanges();

    const { nativeElement } = formComponent.debugElement.query(By.css('.alb-datepicker-input'));
    const input: HTMLInputElement = nativeElement.querySelector('.alb-input-field');

    expect(input.value.trim()).toEqual('01/03/2020');
  });

  it('Trocar de data utilizando o calendar e poder apagar depois e voltar a data pelo calendar', () => {
    const formComponent = TestBed.createComponent(DatepickerForm);
    formComponent.detectChanges();

    const { nativeElement } = formComponent.debugElement.query(By.css('.alb-datepicker-input'));
    const input: HTMLInputElement = nativeElement.querySelector('.alb-input-field');

    input.value = '';
    formComponent.detectChanges();

    expect(input.value.trim()).toEqual('');

    const button: HTMLElement = formComponent.debugElement.query(By.css('.alb-calendar-button')).nativeElement;
    button.click();
    formComponent.detectChanges();

    const dias: DebugElement[] = formComponent.debugElement.queryAll(By.css('.alb-calendar-day'));

    dias[0].nativeElement.click();
    formComponent.detectChanges();

    const valorElement = formComponent.debugElement.query(By.css('#valor')).nativeElement;

    expect(input.value.trim().length).toBeGreaterThan(0);
    expect(valorElement.textContent.trim().length).toBeGreaterThan(0);
  });

  it('Não trocar a data caso o calendar seja aberto e fechado sem clicar em uma data', () => {
    const button: HTMLElement = fixture.debugElement.query(By.css('.alb-calendar-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const prev = fixture.debugElement.query(By.css('.alb-calendar-prev')).nativeElement;

    prev.click();
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    const { nativeElement } = fixture.debugElement.query(By.css('.alb-datepicker-input'));
    const input: HTMLInputElement = nativeElement.querySelector('.alb-input-field');

    expect(input.value.trim()).toEqual('');
  });
});

@Component({
  template: `
    <form [formGroup]="form">
      <alb-datepicker placeholder="Apenas um datepicker" formControlName="date">
      </alb-datepicker>
      <span id="valor">{{form.get('date').value}}</span>
    </form>
  `
})
class DatepickerForm implements OnInit {

  public form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      date: ['2020-03-09', Validators.required]
    });
  }

  onDateChange(date) {
  }
}
