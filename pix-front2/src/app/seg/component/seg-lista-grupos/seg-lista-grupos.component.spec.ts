import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegListaGruposComponent } from './seg-lista-grupos.component';

describe('SegListaGruposComponent', () => {
  let component: SegListaGruposComponent;
  let fixture: ComponentFixture<SegListaGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegListaGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegListaGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
