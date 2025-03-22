import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonIconComponent } from './button-icon.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ButtonIconComponent', () => {
  let component: ButtonIconComponent;
  let fixture: ComponentFixture<ButtonIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

});

@Component({
  template: `
  <button alb-button-icon icon="search"></button>
  `
})
class DisabledButtonIcon { }
