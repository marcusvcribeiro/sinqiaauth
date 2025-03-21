import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloParticipanteIndiretoComponent } from './modulo-participante-indireto.component';

describe('ModuloParticipanteIndiretoComponent', () => {
  let component: ModuloParticipanteIndiretoComponent;
  let fixture: ComponentFixture<ModuloParticipanteIndiretoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloParticipanteIndiretoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloParticipanteIndiretoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
