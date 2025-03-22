import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociacaoCadastrarComponent } from './associacao-cadastrar.component';

describe('AssociacaoCadastrarComponent', () => {
  let component: AssociacaoCadastrarComponent;
  let fixture: ComponentFixture<AssociacaoCadastrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociacaoCadastrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociacaoCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
