import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloNivelHierarquicoComponent } from './modulo-nivel-hierarquico.component';

describe('ModuloNivelHierarquicoComponent', () => {
  let component: ModuloNivelHierarquicoComponent;
  let fixture: ComponentFixture<ModuloNivelHierarquicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloNivelHierarquicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloNivelHierarquicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
