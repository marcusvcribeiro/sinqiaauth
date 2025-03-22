import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegListaDicionarioComponent } from './seg-lista-dicionario.component';

describe('SegListaDicionarioComponent', () => {
  let component: SegListaDicionarioComponent;
  let fixture: ComponentFixture<SegListaDicionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegListaDicionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegListaDicionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
