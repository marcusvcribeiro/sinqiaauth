import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelHierarquicoFormComponent } from './nivel-hierarquico-form.component';

describe('NivelHierarquicoFormComponent', () => {
  let component: NivelHierarquicoFormComponent;
  let fixture: ComponentFixture<NivelHierarquicoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NivelHierarquicoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelHierarquicoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
