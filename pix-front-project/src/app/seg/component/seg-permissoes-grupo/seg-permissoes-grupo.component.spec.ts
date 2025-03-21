import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegPermissoesGrupoComponent } from './seg-permissoes-grupo.component';

describe('SegPermissoesGrupoComponent', () => {
  let component: SegPermissoesGrupoComponent;
  let fixture: ComponentFixture<SegPermissoesGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegPermissoesGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegPermissoesGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
