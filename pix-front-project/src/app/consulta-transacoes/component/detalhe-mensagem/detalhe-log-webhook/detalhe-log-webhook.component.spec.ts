import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheLogWebhookComponent } from './detalhe-log-webhook.component';

describe('DetalheLogWebhookComponent', () => {
  let component: DetalheLogWebhookComponent;
  let fixture: ComponentFixture<DetalheLogWebhookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheLogWebhookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheLogWebhookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
