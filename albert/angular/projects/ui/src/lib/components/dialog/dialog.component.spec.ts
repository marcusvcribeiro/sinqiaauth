import { Overlay } from '@angular/cdk/overlay';
import { Component, Input } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonModule } from '../button/button.module';
import { Dialog, DialogCustom } from './dialog';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog-simple-page',
  template: `
    <p>Hello Dialog!</p>
    <h1>{{ meuInput }}</h1>
  `
})
class DialogPageSimpleComponent {
  @Input() meuInput;
  constructor() { }
}

describe('DialogComponent', () => {
  let pageSimpleFixture: ComponentFixture<DialogPageSimpleComponent>;
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  const dialogConfirm: Dialog = {
    type: 'confirm',
    title: 'Dialog Confirm',
    message: 'Dialog Confirm',
    btnPrimaryText: 'Dialog Confirm',
    btnColor: 'warn',
    btnSecondaryText: 'Dialog Confirm',
    callback: () => console.log('Dialog Confirm')
  };

  const dialogInfo: Dialog = {
    type: 'info',
    title: 'Dialog Info',
    message: 'Dialog Info',
    btnPrimaryText: 'Dialog Info'
  };

  const dialogError: Dialog = {
    type: 'error',
    title: 'Dialog Error',
    message: 'Dialog Error',
    btnPrimaryText: 'Dialog Error'
  };

  const dialogCustom: DialogCustom = {
    type: 'custom',
    component: DialogPageSimpleComponent,
    componentProps: { meuInput: 'Mensagem' }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonModule],
      providers: [DialogService, Overlay],
      declarations: [DialogComponent, DialogPageSimpleComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve aparecer o título', () => {
    component.dialog = dialogInfo;
    fixture.detectChanges();
    const title = document.querySelector('.alb-dialog-message h1').innerHTML;
    expect(title === 'Dialog Info').toBeTruthy();
  });

  it('Deve aparecer a mensagem', () => {
    component.dialog = dialogInfo;
    fixture.detectChanges();
    const title = document.querySelector('.alb-dialog-message p').innerHTML;
    expect(title === 'Dialog Info').toBeTruthy();
  });

  it('Deve conter texto correto no botão', () => {
    component.dialog = dialogInfo;
    fixture.detectChanges();
    const title = document.querySelector('.alb-button-content').innerHTML;
    expect(title === 'Dialog Info').toBeTruthy();
  });

  /**
   * @description
   * Testes específicos para o tipo confirm.
   *
   */
  it('Deve conter botão primário no Confirm', () => {
    component.dialog = dialogConfirm;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.primary'));
    expect(button).toBeTruthy();
  });

  it('Deve conter botão primário de cor warn no Confirm', () => {
    component.dialog = dialogConfirm;
    fixture.detectChanges();
    const buttonColor = fixture.debugElement.query(By.css('.warn'));
    expect(buttonColor).toBeTruthy();
  });

  it('Deve conter botão secundário no Confirm', () => {
    component.dialog = dialogConfirm;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.secondary'));
    expect(button).toBeTruthy();
  });

  it('Deve conter texto do botão secundário no Confirm', () => {
    component.dialog = dialogConfirm;
    fixture.detectChanges();
    const button = document.querySelector('.alb-button-content').innerHTML;
    expect(button === 'Dialog Confirm').toBeTruthy();
  });

  it('Não deve conter ícone no Confirm', () => {
    component.dialog = dialogConfirm;
    fixture.detectChanges();
    const icon = document.querySelector('.alb-dialog-aside .alb-icon').innerHTML;
    expect(icon === '').toBeTruthy();
  });

  it('Deve conter callback como função no confirm', () => {
    component.dialog = dialogConfirm;
    fixture.detectChanges();
    const callback = dialogConfirm.callback;
    expect(callback instanceof Function).toBeTruthy();
  });

  /**
   * Testes específicos para o tipo info.
   */

  it('Deve conter ícone no Info', () => {
    component.dialog = dialogInfo;
    fixture.detectChanges();
    const icon = document.querySelector('.alb-dialog-aside .alb-icon').innerHTML;
    expect(icon === 'info').toBeTruthy();
  });

  it('Deve conter a cor do ícone no Info', () => {
    component.dialog = dialogInfo;
    fixture.detectChanges();
    const iconColor = document.querySelector('.alb-dialog-info');
    expect(iconColor).toBeTruthy();
  });

  /**
   * Testes específicos para o tipo error.
   */
  it('Deve conter ícone no Error', () => {
    component.dialog = dialogError;
    fixture.detectChanges();
    const icon = document.querySelector('.alb-dialog-aside .alb-icon').innerHTML;
    expect(icon === 'cancel').toBeTruthy();
  });

  it('Deve conter a cor do ícone no Error', () => {
    component.dialog = dialogError;
    fixture.detectChanges();
    const iconColor = document.querySelector('.alb-dialog-error');
    expect(iconColor).toBeTruthy();
  });

  it('should ...', inject([DialogService], (service: DialogService) => {
    expect(service).toBeTruthy();
  }));


  /**
   * Testes específicos para o tipo custom.
   */
  it('Deve instanciar o component na dialog', () => {
    pageSimpleFixture = TestBed.createComponent(DialogPageSimpleComponent);

    component.dialog = dialogCustom;
    fixture.detectChanges();
    const helloDialog = document.querySelector('p');
    expect(helloDialog.textContent).toBe('Hello Dialog!');
  });

  it('Deve instanciar o component na dialog e receber parâmetros do componentProps', () => {
    pageSimpleFixture = TestBed.createComponent(DialogPageSimpleComponent);
    pageSimpleFixture.detectChanges();

    const fixtureCustom = TestBed.createComponent(DialogComponent);
    const componentCustom = fixtureCustom.componentInstance;
    componentCustom.dialog = dialogCustom;
    fixtureCustom.detectChanges();

    const meuInput = document.querySelector('h1');

    expect(meuInput.textContent).toBe('Mensagem');
  });
});
