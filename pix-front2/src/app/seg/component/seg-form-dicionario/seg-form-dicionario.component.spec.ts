import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegFormDicionarioComponent } from './seg-form-dicionario.component';

describe('SegFormDicionarioComponent', () => {
  let component: SegFormDicionarioComponent;
  let fixture: ComponentFixture<SegFormDicionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegFormDicionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegFormDicionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
