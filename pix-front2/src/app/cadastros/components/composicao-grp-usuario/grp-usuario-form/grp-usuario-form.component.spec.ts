import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpUsuarioFormComponent } from './grp-usuario-form.component';

describe('GrpUsuarioFormComponent', () => {
  let component: GrpUsuarioFormComponent;
  let fixture: ComponentFixture<GrpUsuarioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrpUsuarioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrpUsuarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
