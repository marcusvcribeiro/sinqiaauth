import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegFormGrupoComponent } from './seg-form-grupo.component';

describe('SegFormGrupoComponent', () => {
  let component: SegFormGrupoComponent;
  let fixture: ComponentFixture<SegFormGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegFormGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegFormGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
