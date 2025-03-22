import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposUsuarioAdicionarComponent } from './grupos-usuario-adicionar.component';

describe('GruposUsuarioAdicionarComponent', () => {
  let component: GruposUsuarioAdicionarComponent;
  let fixture: ComponentFixture<GruposUsuarioAdicionarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposUsuarioAdicionarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposUsuarioAdicionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
