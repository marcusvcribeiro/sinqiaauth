import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerComponent } from './container.component';
import { Component, ViewChild } from '@angular/core';

describe('ContainerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContainerComponent,
        SimpleContainerComponent,
        HeaderContainerComponent,
        SidenavContainerComponent,
        HeaderSidenavContainerComponent
      ]
    })
    .compileComponents();
  }));

  it('Deve ser criado', () => {
    const fixture = TestBed.createComponent(ContainerComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('Deve gerar um layout simples', () => {
    const fixture = TestBed.createComponent(SimpleContainerComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('p');
    expect(element).toBeTruthy();
    expect(component.container.hasHeader).toBe(false);
    expect(component.container.hasSidenav).toBe(false);
  });

  it('Deve gerar um layout com header', () => {
    const fixture = TestBed.createComponent(HeaderContainerComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('.alb-container-header');
    expect(header).toBeTruthy();
    expect(component.container.hasHeader).toBe(true);
    expect(component.container.hasSidenav).toBe(false);
  });

  it('Deve gerar um layout com sidenav', () => {
    const fixture = TestBed.createComponent(SidenavContainerComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const sidenav = fixture.nativeElement.querySelector('.alb-container-sidenav');
    expect(sidenav).toBeTruthy();

    expect(component.container.hasHeader).toBe(false);
    expect(component.container.hasSidenav).toBe(true);
  });

  it('Deve gerar um layout com header e sidenav', () => {
    const fixture = TestBed.createComponent(HeaderSidenavContainerComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('.alb-container-header');
    const sidenav = fixture.nativeElement.querySelector('.alb-container-sidenav');
    expect(sidenav).toBeTruthy();
    expect(header).toBeTruthy();

    expect(component.container.hasHeader).toBe(true);
    expect(component.container.hasSidenav).toBe(true);
  });
});

@Component({
  template: `
    <alb-container>
      <p>Apenas um test</p>
    </alb-container>
  `
})
class SimpleContainerComponent {
  @ViewChild(ContainerComponent, { static: true }) container: ContainerComponent;
}

@Component({
  template: `
    <alb-container>
      <header class="alb-container-header"></header>
      <div class="alb-container-body">
        <p>Apenas um test</p>
      </div>
    </alb-container>
  `
})
class HeaderContainerComponent {
  @ViewChild(ContainerComponent, { static: true }) container: ContainerComponent;
}

@Component({
  template: `
    <alb-container>
      <nav class="alb-container-sidenav"></nav>
      <div class="alb-container-body">
        <p>Apenas um test</p>
      </div>
    </alb-container>
  `
})
class SidenavContainerComponent {
  @ViewChild(ContainerComponent, { static: true }) container: ContainerComponent;
}

@Component({
  template: `
    <alb-container>
      <header class="alb-container-header"></header>
      <nav class="alb-container-sidenav"></nav>
      <div class="alb-container-body">
        <p>Apenas um test</p>
      </div>
    </alb-container>
  `
})
class HeaderSidenavContainerComponent {
  @ViewChild(ContainerComponent, { static: true }) container: ContainerComponent;
}

