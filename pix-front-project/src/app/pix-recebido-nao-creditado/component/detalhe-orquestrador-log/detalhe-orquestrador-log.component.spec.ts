import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheOrquestradorLogComponent } from './detalhe-orquestrador-log.component';

describe('DetalheOrquestradorLogComponent', () => {
  let component: DetalheOrquestradorLogComponent;
  let fixture: ComponentFixture<DetalheOrquestradorLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheOrquestradorLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheOrquestradorLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
