import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociacaoInclusaoComponent } from './associacao-inclusao.component';

describe('AssociacaoInclusaoComponent', () => {
  let component: AssociacaoInclusaoComponent;
  let fixture: ComponentFixture<AssociacaoInclusaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociacaoInclusaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociacaoInclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
