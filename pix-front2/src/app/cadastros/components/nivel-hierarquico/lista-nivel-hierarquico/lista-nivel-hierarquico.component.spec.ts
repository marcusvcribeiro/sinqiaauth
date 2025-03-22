import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNivelHierarquicoComponent } from './lista-nivel-hierarquico.component';

describe('ListaNivelHierarquicoComponent', () => {
  let component: ListaNivelHierarquicoComponent;
  let fixture: ComponentFixture<ListaNivelHierarquicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaNivelHierarquicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaNivelHierarquicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
