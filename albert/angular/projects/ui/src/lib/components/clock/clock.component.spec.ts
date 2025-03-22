import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClockComponent } from './clock.component';
import { ClockModule } from './clock.module';

describe('ClockComponent', () => {
  let component: ClockTest;
  let fixture: ComponentFixture<ClockTest>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ClockModule,
      ],
      declarations: [
        ClockTest,
        ClockTest2,
        ClockTest3,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    const clock = TestBed.createComponent(ClockComponent).componentInstance;
    expect(clock).toBeTruthy();
  });

  it('Deve abrir um relógio', () => {
    const button: HTMLElement = fixture.debugElement.query(By.css('.alb-clock-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const clock = document.querySelector('.alb-clock');
    expect(clock).toBeTruthy();
  });

  it('Deve ficar marcado a hora atual', () => {
    const now = new Date();

    const button: HTMLElement = fixture.debugElement.query(By.css('.alb-clock-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const hourNow = document.querySelector('.alb-clock-header-hour');
    expect(hourNow.textContent.trim()).toEqual(now.getHours().toString().padStart(2, '0'));
  });

  it('Deve ficar marcado o minuto atual', () => {
    const now = new Date();

    const button: HTMLElement = fixture.debugElement.query(By.css('.alb-clock-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const minuteNow = document.querySelector('.alb-clock-header-minute');
    expect(minuteNow.textContent.trim()).toEqual(now.getMinutes().toString().padStart(2, '0'));
  });

  it('Deve ficar marcado o segundo atual', () => {
    const now = new Date();

    const button: HTMLElement = fixture.debugElement.query(By.css('.alb-clock-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const secondNow = document.querySelector('.alb-clock-header-second');
    expect(secondNow.textContent.trim()).toEqual(now.getSeconds().toString().padStart(2, '0'));
  });

  it('Deve abrir o relógio com uma data passada e hora definida', () => {
    const fixtureClockTest2 = TestBed.createComponent(ClockTest2);
    fixtureClockTest2.detectChanges();

    const date = new Date();

    const button: HTMLElement = fixtureClockTest2.debugElement.query(By.css('.alb-clock-button')).nativeElement;
    button.click();
    fixtureClockTest2.detectChanges();

    const headerHour = document.querySelector('.alb-clock-header-hour');
    expect(headerHour.textContent.trim()).toEqual(date.getHours().toString().padStart(2, '0'));
  });

  it('Deve abrir o relógio com uma data passada e minuto definido', () => {
    const fixtureClockTest2 = TestBed.createComponent(ClockTest2);
    fixtureClockTest2.detectChanges();

    const date = new Date();

    const button: HTMLElement = fixtureClockTest2.debugElement.query(By.css('.alb-clock-button')).nativeElement;
    button.click();
    fixtureClockTest2.detectChanges();

    const headerMinute = document.querySelector('.alb-clock-header-minute');
    expect(headerMinute.textContent.trim()).toEqual(date.getMinutes().toString().padStart(2, '0'));
  });

  it('Deve abrir o relógio com uma data passada e segundo definido', () => {
    const fixtureClockTest2 = TestBed.createComponent(ClockTest2);
    fixtureClockTest2.detectChanges();

    const date = new Date();

    const button: HTMLElement = fixtureClockTest2.debugElement.query(By.css('.alb-clock-button')).nativeElement;
    button.click();
    fixtureClockTest2.detectChanges();

    const headerSecond = document.querySelector('.alb-clock-header-second');
    expect(headerSecond.textContent.trim()).toEqual(date.getSeconds().toString().padStart(2, '0'));
  });

  it('Deve abrir o relógio com uma hora passada definida', () => {
    const fixtureClockTest3 = TestBed.createComponent(ClockTest3);
    fixtureClockTest3.detectChanges();

    const button: HTMLElement = fixtureClockTest3.debugElement.query(By.css('.alb-clock-button')).nativeElement;
    button.click();
    fixtureClockTest3.detectChanges();

    const headerHour = document.querySelector('.alb-clock-header-hour');
    expect(headerHour.textContent.trim()).toEqual('12');
  });

  it('Deve abrir o relógio com um minuto passado definido', () => {
    const fixtureClockTest3 = TestBed.createComponent(ClockTest3);
    fixtureClockTest3.detectChanges();

    const button: HTMLElement = fixtureClockTest3.debugElement.query(By.css('.alb-clock-button')).nativeElement;
    button.click();
    fixtureClockTest3.detectChanges();

    const headerMinute = document.querySelector('.alb-clock-header-minute');
    expect(headerMinute.textContent.trim()).toEqual('30');
  });

  it('Deve abrir o relógio com um segundo passado definido', () => {
    const fixtureClockTest3 = TestBed.createComponent(ClockTest3);
    fixtureClockTest3.detectChanges();

    const button: HTMLElement = fixtureClockTest3.debugElement.query(By.css('.alb-clock-button')).nativeElement;
    button.click();
    fixtureClockTest3.detectChanges();

    const headerSecond = document.querySelector('.alb-clock-header-second');
    expect(headerSecond.textContent.trim()).toEqual('00');
  });
});

@Component({
  template: `
    <alb-clock></alb-clock>
  `
})
class ClockTest { }

@Component({
  template: `
    <alb-clock [date]="date"></alb-clock>
  `
})
class ClockTest2 {
  date: Date = new Date();
}

@Component({
  template: `
    <alb-clock [hour]="hour" [minute]="minute" [second]="second"></alb-clock>
  `
})
class ClockTest3 {
  hour = 12;

  minute = 30;

  second = 0;
}
