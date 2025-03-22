import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposUsuarioVisualizacaoComponent } from './grupos-usuario-visualizacao.component';

describe('GruposUsuarioVisualizacaoComponent', () => {
  let component: GruposUsuarioVisualizacaoComponent;
  let fixture: ComponentFixture<GruposUsuarioVisualizacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposUsuarioVisualizacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposUsuarioVisualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
