import { Component } from '@angular/core';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipComponent } from './tooltip.component';
import { AlbertTooltipDirective } from './tooltip.directive';


describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      declarations: [
        TooltipComponent,
        AlbertTooltipDirective,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Criar tooltip', () => {
    const fixtureButtonComponent = TestBed.createComponent(ButtonComponent);
    const button = fixtureButtonComponent.debugElement.query(By.css('.button-class'));
    button.triggerEventHandler('mouseenter', {});
    fixtureButtonComponent.detectChanges();

    const tooltip = document.querySelector('.cdk-overlay-pane');
    expect(tooltip).toBeTruthy();
  });

  it('Remover tooltip', () => {
    const fixtureButtonComponent = TestBed.createComponent(ButtonComponent);
    const button = fixtureButtonComponent.debugElement.query(By.css('.button-class'));
    button.triggerEventHandler('mouseenter', {});
    fixtureButtonComponent.detectChanges();

    button.triggerEventHandler('mouseout', {});
    fixtureButtonComponent.detectChanges();

    const tooltip = document.querySelector('.albert-tooltip');
    expect(tooltip).toBeFalsy();
  });

});

@Component({
  template: `
  <button alb-button albertTooltip="text" class="button-class">Accent</button>
  `
})
class ButtonComponent { }
