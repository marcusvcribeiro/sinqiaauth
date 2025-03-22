import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheWebhookLogComponent } from './detalhe-webhook-log.component';

describe('DetalheWebhookLogComponent', () => {
  let component: DetalheWebhookLogComponent;
  let fixture: ComponentFixture<DetalheWebhookLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheWebhookLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheWebhookLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
