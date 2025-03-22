import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent, SidenavItem } from './sidenav.component';
import { By } from '@angular/platform-browser';

describe('Componente - SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve criar componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deve possuír uma label', () => {
    const items: SidenavItem[] = [{
      id: '1',
      label: 'Item 1',
    }];

    component.items = items;
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('.item')).nativeElement.textContent.trim();
    expect(label).toBe(items[0].label);

  });

  it('Deve possuír uma label', () => {
    const items: SidenavItem[] = [{
      id: '1',
      label: 'Item 1',
    }];

    component.items = items;
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('.item')).nativeElement.textContent.trim();
    expect(label).toBe(items[0].label);
  });

  it('Deve possuír um item selecionado', () => {
    const items: SidenavItem[] = [
      {
        id: '1',
        label: 'Item 1',
      },
      {
        id: '2',
        label: 'Item 2',
      }
    ];

    component.items = items;
    component.selectedItemId = '2';
    fixture.detectChanges();
    const activeElement = fixture.debugElement.query(By.css('.active')).nativeElement;
    expect(activeElement).toBeTruthy();
  });

  it('Deve possuír um item do tipo strong', () => {
    const items: SidenavItem[] = [
      {
        id: '1',
        label: 'Item 1',
        type: 'strong'
      },
      {
        id: '2',
        label: 'Item 2',
      }
    ];

    component.items = items;
    fixture.detectChanges();
    const activeElement = fixture.debugElement.query(By.css('.strong')).nativeElement;
    expect(activeElement).toBeTruthy();
  });

  it('Deve possuír um item do tipo weak', () => {
    const items: SidenavItem[] = [
      {
        id: '1',
        label: 'Item 1',
        type: 'weak'
      },
      {
        id: '2',
        label: 'Item 2',
      }
    ];

    component.items = items;
    fixture.detectChanges();
    const activeElement = fixture.debugElement.query(By.css('.weak')).nativeElement;
    expect(activeElement).toBeTruthy();
  });

  it('Deve emitir o evento navigate quando clicado em um item', () => {
    const items: SidenavItem[] = [
      {
        id: '1',
        label: 'Item 1',
        type: 'weak'
      },
      {
        id: '2',
        label: 'Item 2',
      }
    ];

    spyOn(component.navigate, 'emit');
    component.items = items;
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.item div');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.navigate.emit).toHaveBeenCalled();
  });
});
