import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheLogOrquestradorComponent } from './detalhe-log-orquestrador.component';

describe('DetalheLogOrquestradorComponent', () => {
  let component: DetalheLogOrquestradorComponent;
  let fixture: ComponentFixture<DetalheLogOrquestradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheLogOrquestradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheLogOrquestradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
