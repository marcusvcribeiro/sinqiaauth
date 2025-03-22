/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';

import { ModalComponent } from './modal.component';
import { ModalModule } from './modal.module';
import { ModalService } from './modal.service';

describe('Modal', () => {
  let appPageFixture: ComponentFixture<AppPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ModalModule ],
      declarations: [ AppPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    appPageFixture = TestBed.createComponent(AppPageComponent);
    appPageFixture.detectChanges();
  });

  it('Deve ser criada uma Modal', () => {
    appPageFixture.componentInstance.modalService.create({
      component: AppPageComponent,
    });
    appPageFixture.detectChanges();

    const modalElement = document.querySelector('.alb-modal');

    expect(modalElement).toBeTruthy();
  });

  it('Deve ser fechada', () => {
    appPageFixture.componentInstance.modalService.create({
      component: AppPageComponent,
    });
    appPageFixture.detectChanges();

    const buttonElement = document.querySelector('button');

    buttonElement.click();

    appPageFixture.detectChanges();

    const modalElement = document.querySelector('.alb-modal');

    expect( modalElement).toBeNull();
  });

});

@Component({
  selector: 'app-page',
  template: `
  <p>Teste Modal</p>
  `
})
class AppPageComponent {
  constructor(public modalService: ModalService) { }
}
