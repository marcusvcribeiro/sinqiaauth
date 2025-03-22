import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoLoginComponent } from './historico-login.component';

describe('HistoricoLoginComponent', () => {
  let component: HistoricoLoginComponent;
  let fixture: ComponentFixture<HistoricoLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
