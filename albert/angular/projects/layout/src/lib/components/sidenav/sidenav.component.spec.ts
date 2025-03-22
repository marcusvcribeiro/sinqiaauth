import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SidenavComponent } from './sidenav.component';
import { ContainerModule } from '../container/container.module';
import { RouterModule } from '@angular/router';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  const items = [
    {
      icon: 'work',
      name: 'Home',
      path: '/page-1'
    },
    {
      icon: 'star_border',
      name: 'Favoritos',
      children: [
        {
          name: 'Sub-item',
          path: '/page-2',
        },
      ],
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavComponent ],
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
        ContainerModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Ao passar uma lista do sidenav, ele deve ser criado', () => {
    component.items = items;
    fixture.detectChanges();

    const sidenavItem = fixture.debugElement.query(By.css('.alb-sidenav-item'));
    expect(sidenavItem).toBeTruthy();
  });

  it('Ao clicar em um item deve ser selecionado', () => {
    component.items = items;
    component.selectedItem = items[0];
    fixture.detectChanges();

    const sidenavItemActived = fixture.debugElement.query(By.css('.--selected'));
    expect(sidenavItemActived).toBeTruthy();
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

