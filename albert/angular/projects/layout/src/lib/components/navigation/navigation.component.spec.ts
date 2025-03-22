/* tslint:disable:no-unused-variable */
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NavbarFullModule } from '../navbar-full/navbar-full.module';
import { NavbarSimpleModule } from '../navbar-simple/navbar-simple.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { NavigationItem } from './navigation';
import { NavigationComponent } from './navigation.component';


describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  const itemsChildrens: NavigationItem[] = [
    {
      icon: 'star_border',
      name: 'Favoritos',
      children: [
        {
          name: 'Sub-item',
          path: '/page-1',
        },
      ],
      type: 'simple',
    },
    {
      icon: 'star_border',
      name: 'Indicie',
      children: [
        {
          name: 'Sub-item',
          path: '/page-2',
        },
      ],
      type: 'full',
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavigationComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot([
          {
            path: 'page-1',
            component: Page1Component,
          },
          {
            path: 'page-2',
            component: Page2Component,
          }
        ]),
        SidenavModule,
        NavbarSimpleModule,
        NavbarFullModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Ao passar uma lista, deve criar os icones do sidenav', () => {
    component.items = itemsChildrens;
    fixture.detectChanges();
    const sidenavItem = fixture.debugElement.query(By.css('.alb-sidenav-item'));
    expect(sidenavItem).toBeTruthy();
  });

  it('Ao clicar em um item do sidenav sem filhos, não deve abrir o navbar', () => {
    component.items = itemsChildrens[0].children;
    fixture.detectChanges();
    const sidenavItem: HTMLElement = fixture.debugElement.nativeElement.querySelector('.alb-sidenav-item');
    sidenavItem.click();
    const hasNavbarSimple = fixture.debugElement.query(By.css('.alb-navbarsimple'));
    expect(hasNavbarSimple).toBeFalsy();
  });

  it('Ao clicar em um item do sidenav com o tipo simples, deve abrir o NavbarSimple', () => {
    component.items = itemsChildrens;
    fixture.detectChanges();
    const sidenavItem: HTMLElement = fixture.debugElement.nativeElement.querySelector('.alb-sidenav-item');
    sidenavItem.click();
    fixture.detectChanges();
    const hasNavbarSimple = fixture.debugElement.query(By.css('.alb-navbarsimple'));
    expect(hasNavbarSimple).toBeTruthy();
  });

  it('Ao cliar em um item do sidenav com o tipo full, deve abrir o NavbarFull', () => {
    component.items = itemsChildrens;
    fixture.detectChanges();
    const sidenavItem: HTMLElement[] = [...fixture.debugElement.nativeElement.querySelectorAll('.alb-sidenav-item')];
    sidenavItem[1].click();
    fixture.detectChanges();
    const hasNavbarSimple = fixture.debugElement.query(By.css('.alb-navbarfull'));
    expect(hasNavbarSimple).toBeTruthy();
  });

  it('Se após abrir o navbar, o usuário colocar o mouse fora do navigation(sidenav + navbar), o navbar deve ser fechado', () => {
    const spy = spyOn(component, 'onNavbarSimpleLeave');
    component.items = itemsChildrens;
    fixture.detectChanges();
    const sidenavItem = fixture.debugElement.nativeElement.querySelector('.alb-sidenav-item');
    sidenavItem.click();
    fixture.detectChanges();

    const navigation = fixture.debugElement.nativeElement.querySelector('.alb-navbarsimple');
    navigation.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('Deve ser emitido o Output changeItem', () => {
    const spy = spyOn(component.changeItem, 'emit');
    component.items = itemsChildrens;
    fixture.detectChanges();

    const sidenavItem = fixture.debugElement.query(By.css('.alb-sidenav-item')).nativeElement;
    sidenavItem.click();
    fixture.detectChanges();

    const navItem = fixture.debugElement.query(By.css('.alb-navbarsimple-item')).nativeElement;
    navItem.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);

  });

});

@Component({
  selector: 'app-page-1',
  template: '<p>Page 1</p>'
})
class Page1Component { }

@Component({
  selector: 'app-page-2',
  template: '<p>Page 2</p>'
})
class Page2Component {

}

