import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';
import { Component } from '@angular/core';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonComponent, DisabledButton ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve possuír a classe primary como default', () => {
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    expect(nativeElement.classList.contains('primary')).toBe(true);
  });

  it('Deve possuír a classe secondary quando o tipo for secondary', () => {
    component.type = 'secondary';
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    expect(nativeElement.classList.contains('secondary')).toBe(true);
  });

  it('Deve possuír a classe accent como default', () => {
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    expect(nativeElement.classList.contains('accent')).toBe(true);
  });

  it('Deve possuír a classe warn quando a cor setada for SUCCESS', () => {
    component.color = 'success';
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    expect(nativeElement.classList.contains('success')).toBe(true);
  });

  it('Deve possuír a classe warn quando a cor setada for WARN', () => {
    component.color = 'warn';
    fixture.detectChanges();
    const { nativeElement } = fixture.debugElement;
    expect(nativeElement.classList.contains('warn')).toBe(true);
  });

  it('Deve possuir a classe disabled quando disabled', () => {
    const fixtureDisabledButton = TestBed.createComponent(DisabledButton);
    const disabledClass = fixtureDisabledButton.debugElement.query(By.css('[disabled]'));
    expect(disabledClass).toBeTruthy();
  });
});

@Component({
  template: `
  <button alb-button disabled>TestDisabled</button>
  `
})
class DisabledButton { }
