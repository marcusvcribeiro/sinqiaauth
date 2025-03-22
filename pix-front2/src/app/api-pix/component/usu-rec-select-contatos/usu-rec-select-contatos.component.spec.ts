import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuRecSelectContatosComponent } from './usu-rec-select-contatos.component';

describe('UsuRecSelectContatosComponent', () => {
  let component: UsuRecSelectContatosComponent;
  let fixture: ComponentFixture<UsuRecSelectContatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuRecSelectContatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuRecSelectContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
