import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheCopiaColaComponent } from './detalhe-copia-cola.component';

describe('DetalheCopiaColaComponent', () => {
  let component: DetalheCopiaColaComponent;
  let fixture: ComponentFixture<DetalheCopiaColaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheCopiaColaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheCopiaColaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
