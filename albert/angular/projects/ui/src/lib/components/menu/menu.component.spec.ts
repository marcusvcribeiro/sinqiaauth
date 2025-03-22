import { Overlay } from '@angular/cdk/overlay';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu.component';
import { MenuItemComponent } from './menu-item.component';
import { MenuTemplateDirective } from './menu-item-template.directive';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { By } from '@angular/platform-browser';

@Component({
  template: `
<div>
  <alb-menu [disabled]="disabledMenu">
    <alb-menu-item (click)="clickMenu('Template 1')">
      <ng-template albMenuTemplate><div>Template 1</div></ng-template>
    </alb-menu-item>
    <alb-menu-item label="2" id="2" (click)="clickMenu($event)">
    </alb-menu-item>
    <alb-menu-item label="label 3" id="3">
      <ng-template albMenuTemplate><div>Template 3</div></ng-template>
    </alb-menu-item>
    <alb-menu-item label="4" id="4" (click)="clickMenu($event)" [disabled]="true">
    </alb-menu-item>
  </alb-menu>
</div>

  `
})
class MenuExampleEventComponent {
  disabledMenu = false;

  clickMenu(event) {
    console.log(event);
  }
}

describe('MenuComponent', () => {
  let component: MenuExampleEventComponent;
  let fixture: ComponentFixture<MenuExampleEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        MenuItemComponent,
        MenuTemplateDirective,
        MenuExampleEventComponent
      ],
      providers: [
        Overlay
      ],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        BrowserAnimationsModule,
        PortalModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuExampleEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve abrir o menu quando receber click', () => {
    const menuSpan = fixture.debugElement.nativeElement.querySelector('.alb-menu-span');

    menuSpan.click();
    fixture.detectChanges();

    const menu = document.querySelector('.alb-menu-list');
    expect(menu).toBeTruthy();
  });

  it('Deve exibir menu-item criado com template', () => {
    const menuSpan = fixture.debugElement.nativeElement.querySelector('.alb-menu-span');

    menuSpan.click();
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.alb-menu-list-item'));
    expect(items[0].nativeElement.textContent).toBe('Template 1');
  });

  it('Deve exibir menu-item criado com label', () => {
    const menuSpan = fixture.debugElement.nativeElement.querySelector('.alb-menu-span');

    menuSpan.click();
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.alb-menu-list-item'));
    expect(items[1].nativeElement.textContent).toBe('2');
  });

  it('Deve exibir menu-item com texto do label quando for informado label e template simultaneamente', () => {
    const menuSpan = fixture.debugElement.nativeElement.querySelector('.alb-menu-span');

    menuSpan.click();
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.alb-menu-list-item'));
    expect(items[2].nativeElement.textContent).toBe('label 3');
  });

  it('Deve emitir o item selecionado', (done) => {
    const menuSpan = fixture.debugElement.nativeElement.querySelector('.alb-menu-span');

    menuSpan.click();
    fixture.detectChanges();

    const log = spyOn(console, 'log');
    const items = fixture.debugElement.queryAll(By.css('.alb-menu-list-item'));

    items[1].nativeElement.click();
    fixture.detectChanges();

    setTimeout(() => {
      expect(log).toHaveBeenCalledWith('2');
      done();
    }, 1000);
  });

  it('O ultimo item deve estar desabilitado', () => {
    const menuSpan = fixture.debugElement.nativeElement.querySelector('.alb-menu-span');

    menuSpan.click();
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.alb-menu-list-item'));

    const ultimoItem = items[3].nativeElement;

    expect(ultimoItem.classList).toContain('disabled');
  });

  it('O deve ficar desabilitado', () => {
    component.disabledMenu = true;
    fixture.detectChanges();
    const menuSpan = fixture.debugElement.nativeElement.querySelector('.alb-menu-span');
    expect(menuSpan.classList).toContain('disabled');
  });
});
