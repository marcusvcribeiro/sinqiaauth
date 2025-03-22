import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxComponent } from './box.component';

describe('BoxComponent', () => {
  let component: BoxComponent;
  let fixture: ComponentFixture<BoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve acrescentar um título se for passado como Input', () => {
    const title = 'Teste titulo';
    component.title = title;
    fixture.detectChanges();
    const hasTitle = fixture.debugElement.query(By.css('.alb-box-header'));
    expect(hasTitle).toBeTruthy();
  });

  it('Não deve acrescentar um título se nada for passado como Input', () => {
    fixture.detectChanges();
    const hasTitle = fixture.debugElement.query(By.css('.alb-box-header'));
    expect(hasTitle).toBeFalsy();
  });

});
