import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompFormUsuarioComponent } from './comp-form-usuario.component';

describe('CompFormUsuarioComponent', () => {
  let component: CompFormUsuarioComponent;
  let fixture: ComponentFixture<CompFormUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompFormUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompFormUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
