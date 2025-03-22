import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheDescDataFixaComponent } from './detalhe-desc-data-fixa.component';

describe('DetalheDescDataFixaComponent', () => {
  let component: DetalheDescDataFixaComponent;
  let fixture: ComponentFixture<DetalheDescDataFixaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheDescDataFixaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheDescDataFixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
