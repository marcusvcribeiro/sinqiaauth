import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartPanelComponent } from './smart-panel.component';

describe('SmartPanelComponent', () => {
  let component: SmartPanelComponent;
  let fixture: ComponentFixture<SmartPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
