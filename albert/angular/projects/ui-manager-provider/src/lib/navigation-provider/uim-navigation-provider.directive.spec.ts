/* tslint:disable:no-unused-variable */
import { NavigationItem, NavigationModule } from '@albert/layout';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { UIMProviderConfig } from '../uim-config';
import { UIMNavigationProviderDirective } from './uim-navigation-provider.directive';

@Component({
  selector: 'alb-test-1',
  template: `
    <alb-navigation albUIMNavigationProvider [beforeNavigationLoad]="beforeNavigationLoad"></alb-navigation>
  `
})
class TestComponent {
  beforeNavigationLoad = (navigationItens: NavigationItem[]) => {
    navigationItens[0].onClick = () => window.alert('alerta');
    navigationItens.push({
      name: 'menu 2'
    });
  }
}

const uiManagerProviderConfigMockService = { url: 'menu' } as UIMProviderConfig;
const httpMockService = { get: (url, options) => of([{ nome: 'menu 1' }]) } as HttpClient;
describe('UIMNavigationProviderDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UIMNavigationProviderDirective,
        TestComponent
      ],
      imports: [
        NavigationModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        BrowserAnimationsModule
      ],
      providers: [
        { provide: UIMProviderConfig, useValue: uiManagerProviderConfigMockService },
        { provide: HttpClient, useValue: httpMockService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Ao tendo configuracao e API deve montar menu', () => {
    fixture.detectChanges();
    const sidenavItem = fixture.debugElement.query(By.css('.alb-sidenav-item'));
    expect(sidenavItem).toBeTruthy();
  });

  it('No click deve chamar window alert', () => {

    fixture.detectChanges();
    const sidenavItem = fixture.debugElement.query(By.css('.alb-sidenav-item'));
    spyOn(window, 'alert');

    sidenavItem.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(window.alert).toHaveBeenCalledWith('alerta');
  });

  it('Deve possuir item adicionado atraves do "beforeNavigationLoad"', () => {

    fixture.detectChanges();
    const sidenavItems = fixture.debugElement.queryAll(By.css('.alb-sidenav-item'));
    expect(sidenavItems[1].nativeElement.textContent).toEqual('menu 2');
  });

});
