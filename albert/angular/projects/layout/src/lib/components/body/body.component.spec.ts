import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyComponent } from './body.component';
import { Component } from '@angular/core';

describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
         BodyComponent,
         TitleBodyComponent,
         AsideBodyComponent,
         SimpleBodyComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve possuír um título (h1)', () => {
    const titleBodyComponent = TestBed.createComponent(TitleBodyComponent);
    titleBodyComponent.detectChanges();

    const title = titleBodyComponent.nativeElement.querySelector('.alb-body-header h1');
    expect(title).toBeTruthy();
  });

  it('Deve possuír um aside', () => {
    const asideBodyComponent = TestBed.createComponent(AsideBodyComponent);
    asideBodyComponent.detectChanges();

    const aside = asideBodyComponent.nativeElement.querySelector('.alb-body-header aside');
    expect(aside).toBeTruthy();
  });

  it('Deve possuír um titulo e aside', () => {
    const simpleBodyComponent = TestBed.createComponent(SimpleBodyComponent);
    simpleBodyComponent.detectChanges();

    const title = simpleBodyComponent.nativeElement.querySelector('.alb-body-header h1');
    const aside = simpleBodyComponent.nativeElement.querySelector('.alb-body-header aside');
    expect(title).toBeTruthy();
    expect(aside).toBeTruthy();
  });
});

@Component({
  template: `
    <alb-body>
      <h1>Apenas um título</h1>
    </alb-body>
  `
})
class TitleBodyComponent {}

@Component({
  template: `
    <alb-body>
      <aside>
        <button>Apenas um botão</button>
      </aside>
    </alb-body>
  `
})
class AsideBodyComponent {}

@Component({
  template: `
    <alb-body>
      <h1>Apenas um título</h1>
      <aside>
        <button>Apenas um botão</button>
      </aside>
    </alb-body>
  `
})
class SimpleBodyComponent {}
