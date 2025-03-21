import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloSegurancaComponent } from './modulo-seguranca.component';

describe('ModuloSegurancaComponent', () => {
  let component: ModuloSegurancaComponent;
  let fixture: ComponentFixture<ModuloSegurancaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloSegurancaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloSegurancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
