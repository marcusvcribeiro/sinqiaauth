import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaParticipanteIndiretoComponent } from './lista-participante-indireto.component';

describe('ListaParticipanteIndiretoComponent', () => {
  let component: ListaParticipanteIndiretoComponent;
  let fixture: ComponentFixture<ListaParticipanteIndiretoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaParticipanteIndiretoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaParticipanteIndiretoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
