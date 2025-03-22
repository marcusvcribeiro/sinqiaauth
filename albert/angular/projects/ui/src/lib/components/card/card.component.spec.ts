import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

import { CardComponent, CardAsideDirective } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardComponent,
        CardAsideDirective,
        CardAside,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Se passar um título, deve conter a classe title', () => {
    const title = 'Título';
    component.title = title;
    fixture.detectChanges();
    const titleClass = fixture.debugElement.query(By.css('.alb-card-title'));
    expect(titleClass).toBeTruthy();
  });

  it('Se não passar título, deve conter a classe title', () => {
    const titleClass = fixture.debugElement.query(By.css('.alb-card-title'));
    expect(titleClass).toBeTruthy();
  });

  it('Se passar aside, deve conter a classe aside', () => {
    const fixtureCardAside = TestBed.createComponent(CardAside);
    const asideClass = fixtureCardAside.debugElement.query(By.directive(CardAsideDirective));
    expect(asideClass).toBeTruthy();
  });
});

@Component({
  template: `
    <alb-card>
      <alb-card-aside>TestAside</alb-card-aside>
    </alb-card>
  `
})
class CardAside { }

