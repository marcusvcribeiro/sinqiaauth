import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarNivelHierarquicoFormComponent } from './editar-nivel-hierarquico-form.component';

describe('EditarNivelHierarquicoFormComponent', () => {
  let component: EditarNivelHierarquicoFormComponent;
  let fixture: ComponentFixture<EditarNivelHierarquicoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarNivelHierarquicoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarNivelHierarquicoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
