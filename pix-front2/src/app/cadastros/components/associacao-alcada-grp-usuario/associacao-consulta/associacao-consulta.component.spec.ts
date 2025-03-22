import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociacaoConsultaComponent } from './associacao-consulta.component';

describe('AssociacaoConsultaComponent', () => {
  let component: AssociacaoConsultaComponent;
  let fixture: ComponentFixture<AssociacaoConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociacaoConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociacaoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
