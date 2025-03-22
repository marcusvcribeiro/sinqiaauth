import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposUsuarioEditarComponent } from './grupos-usuario-editar.component';

describe('GruposUsuarioEditarComponent', () => {
  let component: GruposUsuarioEditarComponent;
  let fixture: ComponentFixture<GruposUsuarioEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposUsuarioEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposUsuarioEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
