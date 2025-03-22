import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDictComponent } from './editar-dict.component';

describe('DictEditarComponent', () => {
  let component: EditarDictComponent;
  let fixture: ComponentFixture<EditarDictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarDictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
