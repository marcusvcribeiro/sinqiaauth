import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociacaoEditarComponent } from './associacao-editar.component';

describe('AssociacaoEditarComponent', () => {
  let component: AssociacaoEditarComponent;
  let fixture: ComponentFixture<AssociacaoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociacaoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociacaoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
