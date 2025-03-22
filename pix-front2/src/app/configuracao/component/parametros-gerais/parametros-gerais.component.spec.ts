import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosGeraisComponent } from './parametros-gerais.component';

describe('ParametrosGeraisComponent', () => {
  let component: ParametrosGeraisComponent;
  let fixture: ComponentFixture<ParametrosGeraisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametrosGeraisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosGeraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
