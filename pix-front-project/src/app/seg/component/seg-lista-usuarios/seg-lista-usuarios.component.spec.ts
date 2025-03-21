import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegListaUsuariosComponent } from './seg-lista-usuarios.component';

describe('SegListaUsuariosComponent', () => {
  let component: SegListaUsuariosComponent;
  let fixture: ComponentFixture<SegListaUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegListaUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegListaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
