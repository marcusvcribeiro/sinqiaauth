import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './calendar.component';
import { CalendarModule } from './calendar.module';

describe('CalendarComponent', () => {
  let component: CalendarTest;
  let fixture: ComponentFixture<CalendarTest>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CalendarModule,
      ],
      declarations: [
        CalendarTest,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    const calendar = TestBed.createComponent(CalendarComponent).componentInstance;
    expect(calendar).toBeTruthy();
  });

  it('Deve abrir um calendário', () => {
    const button: HTMLElement = fixture.debugElement.query(By.css('.alb-calendar-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const calendar = document.querySelector('.alb-calendar');
    expect(calendar).toBeTruthy();
  });

  it('Deve ficar marcado o dia de hoje', () => {
    const date = new Date();
    const button: HTMLElement = fixture.debugElement.query(By.css('.alb-calendar-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const today = document.querySelector('.alb-calendar-day.--today');
    expect(Number(today.textContent.trim())).toEqual(date.getDate());
  });

  it('Deve abrir o calendário com uma data passada', () => {
    const date = new Date(2020, 3, 4);
    component.date = date;
    fixture.detectChanges();
    const button: HTMLElement = fixture.debugElement.query(By.css('.alb-calendar-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const today = document.querySelector('.alb-calendar-day.--selected');
    expect(Number(today.textContent.trim())).toEqual(date.getDate());
  });

  it('Deve navegar para o mês seguinte e o mês anterior', () => {
    const date = new Date(2020, 3, 4);
    component.date = date;
    fixture.detectChanges();
    const button: HTMLElement = fixture.debugElement.query(By.css('.alb-calendar-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const prev = fixture.debugElement.query(By.css('.alb-calendar-prev')).nativeElement;
    const next = fixture.debugElement.query(By.css('.alb-calendar-next')).nativeElement;

    prev.click();
    fixture.detectChanges();

    let month = document.querySelector('.alb-calendar-month');
    expect(month.textContent.trim()).toEqual('March - 2020');

    next.click();
    fixture.detectChanges();

    month = document.querySelector('.alb-calendar-month');
    expect(month.textContent.trim()).toEqual('April - 2020');
  });

  it('Navegar e fechar o calendar não altera a data', () => {
    const date = new Date(2020, 3, 4);
    component.date = date;
    fixture.detectChanges();
    const button: HTMLElement = fixture.debugElement.query(By.css('.alb-calendar-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const prev = fixture.debugElement.query(By.css('.alb-calendar-prev')).nativeElement;

    prev.click();
    fixture.detectChanges();

    const month = document.querySelector('.alb-calendar-month');
    expect(month.textContent.trim()).toEqual('March - 2020');

    button.click();
    fixture.detectChanges();

    const today = document.querySelector('.alb-calendar-day.--selected');
    expect(Number(today.textContent.trim())).toEqual(date.getDate());
  });
});

@Component({
  template: `
    <alb-calendar [date]="date" (change)="onDateChange()"></alb-calendar>
  `
})
class CalendarTest {

  date = new Date();

  onDateChange(date) {
  }
}
