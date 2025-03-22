import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { NavbarSimpleComponent } from './navbar-simple.component';
import { NavbarSimpleItemComponent } from './navbar-simple-item.component';
import { NavbarSimpleItem } from './navbar-simple';
import { NavbarSimpleService } from './navbar-simple.service';


describe('NavbarSimpleComponent', () => {
  let component: NavbarSimpleComponent;
  let fixture: ComponentFixture<NavbarSimpleComponent>;
  const list: NavbarSimpleItem[] = [
    {
      name: 'Indice',
      children: [
        {
          name: 'Subitem 1',
          path: '/page-1',
        },
        {
          name: 'Subitem 2',
          path: '/page-2',
        }
      ]
    },
    {
      name: 'Favorito',
      path: '/page-1',
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarSimpleComponent,
        NavbarSimpleItemComponent
      ],
      imports: [
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
       ],
       providers: [
        NavbarSimpleService,
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Ao passar uma lista, deve criar uma nova sessão ao lado do sidenav', () => {
    component.items = list;
    fixture.detectChanges();
    const menuItem = fixture.debugElement.query(By.css('.alb-navbarsimple'));
    expect(menuItem).toBeTruthy();
  });

  it('Ao passar uma lista com filhos, deve criar a hierarquia de links', () => {
    component.items = list;
    fixture.detectChanges();
    const item = fixture.debugElement.query(By.css('.alb-navbarsimple-item'));
    expect(item).toBeTruthy();

    const subitem = item.query(By.css('.alb-navbarsimple-item'));
    expect(subitem).toBeTruthy();
  });

  it('Se não for passado uma lista, deve ser criado apenas um navbar vazio', () => {
    const navbar = fixture.debugElement.query(By.css('.alb-navbarsimple'));
    expect(navbar).toBeTruthy();
    const navbarItem = fixture.debugElement.query(By.css('.alb-navbarsimple-item'));
    expect(navbarItem).toBeFalsy();
  });

  it('Deve ser emitido o Output changeItem', () => {
    const spy = spyOn(component.changeItem, 'emit');
    component.items = list;
    fixture.detectChanges();

    const item: HTMLElement = fixture.debugElement.query(By.css('.alb-navbarsimple-item')).nativeElement;
    item.click();

    expect(spy).toHaveBeenCalled();

  });

  it('Deve ser emitido o Ouput mouseLeave', () => {
    const spy = spyOn(component.mouseLeave, 'emit');
    component.items = list;
    fixture.detectChanges();

    const nav: HTMLElement = fixture.debugElement.query(By.css('.alb-navbarsimple')).nativeElement;
    nav.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
});

@Component({
  selector: 'app-page-1',
  template: '<p>Page 1</p>'
})
class Page1Component {}

@Component({
  selector: 'app-page-2',
  template: '<p>Page 2</p>'
})
class Page2Component {

}
