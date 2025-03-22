import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegPermissoesUsuarioComponent } from './seg-permissoes-usuario.component';

describe('SegPermissoesUsuarioComponent', () => {
  let component: SegPermissoesUsuarioComponent;
  let fixture: ComponentFixture<SegPermissoesUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegPermissoesUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegPermissoesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
