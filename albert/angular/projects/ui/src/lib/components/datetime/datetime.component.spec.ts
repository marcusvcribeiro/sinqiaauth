import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatetimeComponent } from './datetime.component';
import { DatetimeModule } from './datetime.module';

describe('DatetimeComponent', () => {
  let component: DatetimeTest;
  let fixture: ComponentFixture<DatetimeTest>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        DatetimeModule,
      ],
      declarations: [
        DatetimeTest,
        DatetimeTest2,
        DatetimeTest3,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimeTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    const datetime = TestBed.createComponent(DatetimeComponent).componentInstance;

    expect(datetime).toBeTruthy();
  });

  it('Deve abrir um calendário', () => {
    const button: HTMLElement = fixture.debugElement.query(By.css('.alb-datetime-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const datetimeCalendar = document.querySelector('.alb-datetime-calendar');
    expect(datetimeCalendar).toBeTruthy();
  });

  it('Deve abrir um relógio', () => {
    const button: HTMLElement = fixture.debugElement.query(By.css('.alb-datetime-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const datetimeClock = document.querySelector('.alb-datetime-clock');
    expect(datetimeClock).toBeTruthy();
  });

  it('Deve ficar marcado o dia de hoje', () => {
    const date = new Date();
    const button: HTMLElement = fixture.debugElement.query(By.css('.alb-datetime-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const today = document.querySelector('.alb-datetime-calendar-day.--today');
    expect(Number(today.textContent.trim())).toEqual(date.getDate());
  });

  it('Deve abrir o calendário com uma data passada', () => {
    const date = new Date(2020, 3, 4);
    component.date = date;
    fixture.detectChanges();

    const button: HTMLElement = fixture.debugElement.query(By.css('.alb-datetime-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const today = document.querySelector('.alb-datetime-calendar-day.--selected');
    expect(Number(today.textContent.trim())).toEqual(date.getDate());
  });

  it('Deve ficar marcado a hora atual', () => {
    const now = new Date();

    const button: HTMLElement = fixture.debugElement.query(By.css('.alb-datetime-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const hourNow = document.querySelector('.alb-datetime-clock-header-hour');
    expect(hourNow.textContent.trim()).toEqual(now.getHours().toString().padStart(2, '0'));
  });

  it('Deve ficar marcado o minuto atual', () => {
    const now = new Date();

    const button: HTMLElement = fixture.debugElement.query(By.css('.alb-datetime-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const minuteNow = document.querySelector('.alb-datetime-clock-header-minute');
    expect(minuteNow.textContent.trim()).toEqual(now.getMinutes().toString().padStart(2, '0'));
  });

  it('Deve ficar marcado o segundo atual', () => {
    const now = new Date();

    const button: HTMLElement = fixture.debugElement.query(By.css('.alb-datetime-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const secondNow = document.querySelector('.alb-datetime-clock-header-second');
    expect(secondNow.textContent.trim()).toEqual(now.getSeconds().toString().padStart(2, '0'));
  });


  it('Deve abrir o relógio com uma hora passada definida', () => {
    const fixtureDatetimeTest2 = TestBed.createComponent(DatetimeTest2);
    fixtureDatetimeTest2.detectChanges();

    const button: HTMLElement = fixtureDatetimeTest2.debugElement.query(By.css('.alb-datetime-button')).nativeElement;
    button.click();
    fixtureDatetimeTest2.detectChanges();

    const headerHour = document.querySelector('.alb-datetime-clock-header-hour');
    expect(headerHour.textContent.trim()).toEqual('12');
  });

  it('Deve abrir o relógio com um minuto passado definido', () => {
    const fixtureDatetimeTest2 = TestBed.createComponent(DatetimeTest2);
    fixtureDatetimeTest2.detectChanges();

    const button: HTMLElement = fixtureDatetimeTest2.debugElement.query(By.css('.alb-datetime-button')).nativeElement;
    button.click();
    fixtureDatetimeTest2.detectChanges();

    const headerMinute = document.querySelector('.alb-datetime-clock-header-minute');
    expect(headerMinute.textContent.trim()).toEqual('30');
  });

  it('Deve abrir o relógio com um segundo passado definido', () => {
    const fixtureDatetimeTest2 = TestBed.createComponent(DatetimeTest2);
    fixtureDatetimeTest2.detectChanges();

    const button: HTMLElement = fixtureDatetimeTest2.debugElement.query(By.css('.alb-datetime-button')).nativeElement;
    button.click();
    fixtureDatetimeTest2.detectChanges();

    const headerSecond = document.querySelector('.alb-datetime-clock-header-second');
    expect(headerSecond.textContent.trim()).toEqual('00');
  });

  it('Deve atualizar o calendário quando a data informada pelo @input é alterada e válida', () => {
    let date = new Date(2020, 3, 4);
    component.date = date;
    fixture.detectChanges();

    const button: HTMLElement = fixture.debugElement.query(By.css('.alb-datetime-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    let today = document.querySelector('.alb-datetime-calendar-day.--selected');
    expect(Number(today.textContent.trim())).toEqual(date.getDate());

    date = new Date(2020, 4, 19);
    component.date = date;
    fixture.detectChanges();

    today = document.querySelector('.alb-datetime-calendar-day.--selected');
    expect(Number(today.textContent.trim())).toEqual(date.getDate());
  });
});

@Component({
  template: `
    <alb-datetime [date]="date" (change)="onDatetimeChange($event)"></alb-datetime>
  `
})
class DatetimeTest {

  date = new Date();
  dateOutput: Date;

  onDatetimeChange(date) {
    this.dateOutput = date;
  }
}

@Component({
  template: `
    <alb-datetime [hour]="hour" [minute]="minute" [second]="second"></alb-datetime>
  `
})
class DatetimeTest2 {
  hour = 12;

  minute = 30;

  second = 0;
}

@Component({
  template: `
    <alb-datetime [date]="date" [hour]="hour" [minute]="minute" [second]="second"></alb-datetime>
  `
})
class DatetimeTest3 {
  date: Date = new Date();

  hour = 12;

  minute = 30;

  second = 0;
}
