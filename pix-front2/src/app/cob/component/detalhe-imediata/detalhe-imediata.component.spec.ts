import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheImediataComponent } from './detalhe-imediata.component';

describe('DetalheImediataComponent', () => {
  let component: DetalheImediataComponent;
  let fixture: ComponentFixture<DetalheImediataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheImediataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheImediataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
