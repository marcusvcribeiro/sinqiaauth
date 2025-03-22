import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuRecSelectEscoposComponent } from './usu-rec-select-escopos.component';

describe('UsuRecSelectEscoposComponent', () => {
  let component: UsuRecSelectEscoposComponent;
  let fixture: ComponentFixture<UsuRecSelectEscoposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuRecSelectEscoposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuRecSelectEscoposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
