import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent, HeaderGroupDirective } from './header.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        HeaderGroupDirective,
        NameAplicationHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve possuír o nome da aplicação', () => {
    const nameAplication = 'Teste';
    component.name = nameAplication;
    fixture.detectChanges();
    const labelTitle = fixture.debugElement.query(By.css('.alb-header-name')).nativeElement.textContent.trim();

    expect(labelTitle).toEqual(nameAplication);
  });

  it('Deve possuír o sub titulo da aplicação', () => {
    const description = 'Teste Subtitulo';
    component.description = description;
    fixture.detectChanges();
    const labelSubTitle = fixture.debugElement.query(By.css('.alb-header-subtitle')).nativeElement.textContent.trim();

    expect(labelSubTitle).toEqual(description);
  });

  it('Deve possuír uma cor de icone', () => {
    const colorIcon = 'rgb(0, 204, 106)';
    component.logoColor = colorIcon;
    fixture.detectChanges();
    const color = fixture.debugElement.query(By.css('.alb-header-logo-icon')).styles.color;

    expect(color).toEqual(colorIcon);
  });

  it('Deve possuír um botão no header', () => {
    const headerComponent = TestBed.createComponent(NameAplicationHeaderComponent);
    headerComponent.detectChanges();

    const button = headerComponent.nativeElement.querySelector('.alb-header-group button');
    expect(button).toBeTruthy();
  });

});

@Component({
  template: `
    <alb-header>
      <alb-header-group>
        <button>Button 01</button>
      </alb-header-group>
    </alb-header>
  `
})
class NameAplicationHeaderComponent {}
