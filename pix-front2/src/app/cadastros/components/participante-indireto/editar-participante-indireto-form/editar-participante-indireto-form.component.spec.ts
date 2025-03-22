import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarParticipanteIndiretoFormComponent } from './editar-participante-indireto-form.component';

describe('EditarParticipanteIndiretoFormComponent', () => {
  let component: EditarParticipanteIndiretoFormComponent;
  let fixture: ComponentFixture<EditarParticipanteIndiretoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarParticipanteIndiretoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarParticipanteIndiretoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
