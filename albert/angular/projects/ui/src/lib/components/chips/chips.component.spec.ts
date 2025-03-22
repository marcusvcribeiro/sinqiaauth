import { ChipsComponent } from './chips.component';
import { ChipsModule } from './chips.module';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ChipsComponent', () => {
  let component: ChipsComponent;
  let fixture: ComponentFixture<ChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ChipsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    const chips = TestBed.createComponent(ChipsComponent).componentInstance;
    expect(chips).toBeTruthy();
  });

  it('Deve possuir um chip', () => {
    const chip = component.addChips({
      key: 'keyTest',
      placeholder: 'PlaceholderTest',
      value: 'ValueTest'
    });
    fixture.detectChanges();
    const chipElement = document.querySelector('.alb-chips-item');
    expect(chipElement).toBeTruthy();
  });

  it('Deve possuir um chip com placeholder', () => {
    const chip = component.addChips({
      key: 'keyTest',
      placeholder: 'PlaceholderTest',
      value: 'ValueTest'
    });
    fixture.detectChanges();
    const placeholderText = document.querySelector('.alb-chips-item .alb-chips-placeholder').textContent.trim();
    const valueText = document.querySelector('.alb-chips-item .alb-chips-value').textContent.trim();
    expect(
      placeholderText === 'PlaceholderTest' &&
      valueText === 'ValueTest'
    ).toBeTruthy();
  });

  it('Deve adicionar um chip com key', () => {
    component.addChips({
      key: 'test',
      placeholder: 'PlaceholderTest',
      value: 'ValueTest'
    });
    fixture.detectChanges();
    const chipElement = document.querySelector('.alb-chips-item.alb-chips-key-test');
    expect(chipElement).toBeTruthy();
  });

  it('Deve adicionar um chip e selecionar ele', () => {
    component.isSelectable = true;
    const chip = component.addChips({
      key: 'test',
      placeholder: 'PlaceholderTest',
      value: 'ValueTest'
    });
    component.selecionarChip(chip);
    fixture.detectChanges();
    const chipElement = document.querySelector('.alb-chips-item.alb-chips-key-test.alb-chip-selectable');
    expect(chipElement).toBeTruthy();
  });

  it('Deve desabilitar a opção de remover', () => {
    component.remove = false;
    component.addChips({
      key: 'test',
      placeholder: 'PlaceholderTest',
      value: 'ValueTest'
    });
    fixture.detectChanges();
    const chipElement = document.querySelector('.alb-chips-item.alb-chips-key-test .alb-chips-icon');
    expect(chipElement).toBeFalsy();
  });

  it('Deve desabilitar a exibição de placeholder', () => {
    component.placeholder = false;
    component.addChips({
      key: 'test',
      placeholder: 'PlaceholderTest',
      value: 'ValueTest'
    });
    fixture.detectChanges();
    const chipElement = document.querySelector('.alb-chips-item .alb-chips-placeholder');
    expect(chipElement).toBeFalsy();
  });

  it('Deve remover o chip', () => {
    const chip = component.addChips({
      key: 'test',
      placeholder: 'PlaceholderTest',
      value: 'ValueTest'
    });
    component.removeChip(chip);
    fixture.detectChanges();
    const chipElement = document.querySelector('.alb-chips-item');
    expect(chipElement).toBeFalsy();
  });

  it('Deve ser do tipo lista', () => {
    component.isList = true;
    fixture.detectChanges();
    const chipElement = document.querySelector('.alb-chips-container.alb-chips-container-list');
    expect(chipElement).toBeTruthy();
  });

  it('Deve ser do tipo noWrap', () => {
    component.noWrap = true;
    fixture.detectChanges();
    const chipElement = document.querySelector('.alb-chips-container.alb-chips-container-noWrap');
    expect(chipElement).toBeTruthy();
  });

  it('Deve ser disparado o evento de onDestroy ao remover chip', fakeAsync(() => {
    let eventTriggered = false;
    const chip = component.addChips({
      key: 'test',
      placeholder: 'PlaceholderTest',
      value: 'ValueTest',
      onDestroy: () => {
        eventTriggered = true;
      }
    });
    component.removeChip(chip);
    tick(100);
    expect(eventTriggered).toBeTruthy();
  }));

});
