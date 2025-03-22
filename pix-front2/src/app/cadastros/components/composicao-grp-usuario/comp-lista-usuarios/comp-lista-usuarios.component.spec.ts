import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompListaUsuariosComponent } from './comp-lista-usuarios.component';

describe('CompListaUsuariosComponent', () => {
  let component: CompListaUsuariosComponent;
  let fixture: ComponentFixture<CompListaUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompListaUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompListaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
