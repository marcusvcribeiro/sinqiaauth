import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, Output, EventEmitter } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from './toast.module';
import { ToastService } from './toast.service';
import { Toast } from './toast';

describe('Toast', () => {

  let pageSimpleFixture: ComponentFixture<PageSimpleComponent>;

  const toastAlert: Toast = {
    type: 'alert',
    text: 'Toast alert testing'
  };

  const toastSuccess: Toast = {
    type: 'success',
    text: 'Toast success testing'
  };

  const toastError: Toast = {
    type: 'error',
    text: 'Toast error testing'
  };

  const toastInfo: Toast = {
    type: 'info',
    text: 'Toast info testing'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ToastModule
      ],
      declarations: [
        PageSimpleComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    pageSimpleFixture = TestBed.createComponent(PageSimpleComponent);

    pageSimpleFixture.detectChanges();
  });

  it('Deve ser criado um Toast', () => {
    pageSimpleFixture.componentInstance.toastService.create(toastAlert);

    pageSimpleFixture.detectChanges();

    const toast = document.querySelector('.alb-toast');


    expect(toast).toBeTruthy();
  });

  it('Deve ter um texto', () => {
    pageSimpleFixture.componentInstance.toastService.create( toastAlert );

    pageSimpleFixture.detectChanges();

    const toastText = document.querySelector('.alb-toast-content').innerHTML;

    expect(toastText === ' Toast alert testing ').toBeTruthy();
  });

  it('Deve ter um tipo', () => {
    pageSimpleFixture.componentInstance.toastService.create( toastAlert );

    pageSimpleFixture.detectChanges();

    const toastType = document.querySelector('.alb-toast-alert');

    expect(toastType).toBeTruthy();
  });

  it('Deve ser do tipo success', () => {
    pageSimpleFixture.componentInstance.toastService.create( toastSuccess );

    pageSimpleFixture.detectChanges();

    const toastTypeSuccess = document.querySelector('.alb-toast-success');

    expect(toastTypeSuccess).toBeTruthy();
  });

  it('Deve ser do tipo error', () => {
    pageSimpleFixture.componentInstance.toastService.create( toastError );

    pageSimpleFixture.detectChanges();

    const toastTypeError = document.querySelector('.alb-toast-error');

    expect(toastTypeError).toBeTruthy();
  });

  it('Deve ser do tipo info', () => {
    pageSimpleFixture.componentInstance.toastService.create( toastInfo );

    pageSimpleFixture.detectChanges();

    const toastTypeInfo = document.querySelector('.alb-toast-info');

    expect(toastTypeInfo).toBeTruthy();
  });

});

@Component({
  selector: 'app-simple-page',
  template: `
    <h1> Toast testing </h1>
  `
})
class PageSimpleComponent {
  constructor(public toastService: ToastService) {}
}
