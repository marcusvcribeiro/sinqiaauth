import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociacaoLiberacaoComponent } from './associacao-liberacao.component';

describe('AssociacaoLiberacaoComponent', () => {
  let component: AssociacaoLiberacaoComponent;
  let fixture: ComponentFixture<AssociacaoLiberacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociacaoLiberacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociacaoLiberacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
