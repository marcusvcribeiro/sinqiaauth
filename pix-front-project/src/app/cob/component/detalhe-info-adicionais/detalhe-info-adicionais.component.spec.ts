import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheInfoAdicionaisComponent } from './detalhe-info-adicionais.component';

describe('DetalheInfoAdicionaisComponent', () => {
  let component: DetalheInfoAdicionaisComponent;
  let fixture: ComponentFixture<DetalheInfoAdicionaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheInfoAdicionaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheInfoAdicionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
