import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegFormUsuarioComponent } from './seg-form-usuario.component';

describe('SegFormUsuarioComponent', () => {
  let component: SegFormUsuarioComponent;
  let fixture: ComponentFixture<SegFormUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegFormUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegFormUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
