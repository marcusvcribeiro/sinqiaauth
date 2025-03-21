import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegFormUsuarioSenhaComponent } from './seg-form-usuario-senha.component';

describe('SegFormUsuarioSenhaComponent', () => {
  let component: SegFormUsuarioSenhaComponent;
  let fixture: ComponentFixture<SegFormUsuarioSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegFormUsuarioSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegFormUsuarioSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
