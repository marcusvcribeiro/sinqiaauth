import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipanteIndiretoFormComponent } from './participante-indireto-form.component';

describe('ParticipanteIndiretoFormComponent', () => {
  let component: ParticipanteIndiretoFormComponent;
  let fixture: ComponentFixture<ParticipanteIndiretoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipanteIndiretoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipanteIndiretoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
