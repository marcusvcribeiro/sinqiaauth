
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NavbarFullComponent, NavbarFullAsideComponent, NavbarFullItemComponent } from './navbar-full.component';
import { NavbarFullItem } from './navbar-full';
import { RouterModule } from '@angular/router';
import { NavbarFullService } from './navbar-full.service';


describe('NavbarFullComponent', () => {
  let component: NavbarFullComponent;
  let fixture: ComponentFixture<NavbarFullComponent>;

  const items: NavbarFullItem[] = [
    {
      id: '1',
      name: 'Test 1',
      children: [
        {
          id: '1-1',
          name: 'Test 1-1',
          children:
          [
            {
              id: '1-1-1',
              name: 'Test-1-1-1',
              path: '/page-1',
            },
            {
              id: '1-1-2',
              name: 'Test-1-1-2',
              path: '/page-2'
            }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Test 2',
      children: [
        {
          id: '2-1',
          name: 'Test 2-1',
          children:
          [
            {
              id: '2-1-1',
              name: 'Test-2-1-1',
              path: '/page-2',
            },

            {
              id: '2-1-2',
              name: 'Test-2-1-2',
              path: '/page-1'
            }
          ]
        }
      ]
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
      declarations: [
        NavbarFullComponent,
        NavbarFullAsideComponent,
        NavbarFullItemComponent,
      ],
      providers: [
        NavbarFullService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarFullComponent);
    component = fixture.componentInstance;
    component.items = items;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve criar uma lista de navegação simples', () => {
    const item: HTMLElement = fixture.debugElement.query(By.css('.alb-navbarfull-item.--link')).nativeElement;
    expect(item.textContent).toContain(items[0].children[0].children[0].name);

  });

  it('Deve possuír a lista de navegação com a barra lateral (aside)', () => {
    component.offsetAside = 1;
    component.ngOnInit();
    fixture.detectChanges();
    const item: HTMLElement = fixture.debugElement.query(By.css('.alb-navbarfull-aside > .alb-navbarfull-item')).nativeElement;
    expect(item.textContent).toContain(items[0].name);
  });

  it('O item deve ser selecionado e emitir o evento changeItem', () => {
    spyOn(component.changeItem, 'emit');
    const item: HTMLElement = fixture.debugElement.query(By.css('.alb-navbarfull-item.--link')).nativeElement;
    item.click();
    expect(component.changeItem.emit).toHaveBeenCalled();
  });


  it('Um item no modo de layout Aside deve ser alterado quando selecionado', () => {
    component.offsetAside = 1;
    component.ngOnInit();
    fixture.detectChanges();

    const item: HTMLElement = fixture.debugElement.queryAll(By.css('.alb-navbarfull-aside > .alb-navbarfull-item'))[1].nativeElement;
    item.click();
    fixture.detectChanges();

    expect(item.classList.contains('--selected')).toBeTruthy();
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
