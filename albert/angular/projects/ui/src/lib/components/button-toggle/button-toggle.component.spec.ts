import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonToggleComponent, ButtonToggleGroupDirective } from './button-toggle.component';
import { Component } from '@angular/core';

describe('ButtonToggle', () => {
  let fixture: ComponentFixture<SimpleButtonToggle>;
  let component: SimpleButtonToggle;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SimpleButtonToggle,
        ButtonToggleGroupDirective,
        ButtonToggleComponent,
        CheckedButtonToggle,
        VerticalButtonToggle
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleButtonToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('O botão deve ser checado quando clicado', () => {
    const button = fixture.nativeElement.querySelector('.alb-button-toggle-button');
    button.click();
    fixture.detectChanges();

    const check = fixture.nativeElement.querySelector('.alb-button-toggle-checked');
    expect(check).toBeTruthy();
  });

  it('O botão deve ser alterado', () => {
    const [button1, button2] = fixture.nativeElement.querySelectorAll('.alb-button-toggle-button');

    button1.click();
    fixture.detectChanges();
    const check1 = fixture.nativeElement.querySelectorAll('.alb-button-toggle-checked');
    expect(check1.length).toBe(1);

    button2.click();
    fixture.detectChanges();
    const check2 = fixture.nativeElement.querySelectorAll('.alb-button-toggle-checked');
    expect(check2.length).toBe(1);
  });

  it('Deve iniciar com check', () => {
    const fixtureCheckedButtonToggle = TestBed.createComponent(CheckedButtonToggle);
    fixtureCheckedButtonToggle.detectChanges();

    const check = fixture.nativeElement.querySelectorAll('.alb-button-toggle-checked');
    expect(check).toBeTruthy();
  });

  it('Deve iniciar o componente com a direção na HORIZONTAL', () => {
    const group: HTMLElement = fixture.nativeElement.querySelector('.alb-button-toggle-group');
    expect(group.classList.contains('horizontal')).toBe(true);
  });

  it('Deve iniciar o componente com a direção na VERTICAL', () => {
    const fixtureVerticalButtonToggle = TestBed.createComponent(VerticalButtonToggle);
    const group: HTMLElement = fixtureVerticalButtonToggle.nativeElement.querySelector('.alb-button-toggle-group');
    fixtureVerticalButtonToggle.detectChanges();
    expect(group.classList.contains('vertical')).toBe(true);
  });
});

@Component({
  template: `
    <alb-button-toggle-group>
      <alb-button-toggle *ngFor="let button of buttons">Test 1</alb-button-toggle>
    </alb-button-toggle-group>
  `
})
class SimpleButtonToggle {
  buttons = ['One', 'Two', 'Three'];
}

@Component({
  template: `
    <alb-button-toggle-group>
      <alb-button-toggle checked>Test 1</alb-button-toggle>
      <alb-button-toggle>Test 2</alb-button-toggle>
      <alb-button-toggle>Test 3</alb-button-toggle>
    </alb-button-toggle-group>
  `
})
class CheckedButtonToggle {}

@Component({
  template: `
    <alb-button-toggle-group direction="vertical">
      <alb-button-toggle *ngFor="let button of buttons">Test 1</alb-button-toggle>
    </alb-button-toggle-group>
  `
})
class VerticalButtonToggle {
  buttons = ['One', 'Two', 'Three'];
}
