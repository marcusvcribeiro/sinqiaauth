import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcacaoFraudePrincipalComponent } from './marcacao-fraude-principal.component';

describe('MarcacaoFraudePrincipalComponent', () => {
  let component: MarcacaoFraudePrincipalComponent;
  let fixture: ComponentFixture<MarcacaoFraudePrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcacaoFraudePrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcacaoFraudePrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
