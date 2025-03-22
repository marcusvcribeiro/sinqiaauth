/* tslint:disable:no-unused-variable */
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabBodyWrapperDirective } from './tab-body.directive';
import { TabGroupComponent } from './tab-group.component';
import { TabHeaderWrapperDirective } from './tab-header.directive';
import { TabComponent } from './tab.component';


describe('TabComponent', () => {
  let component: TabExampleComponent;
  let fixture: ComponentFixture<TabExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        PortalModule,
        CommonModule
      ],
      declarations: [
        TabGroupComponent,
        TabComponent,
        TabBodyWrapperDirective,
        TabHeaderWrapperDirective,
        TabExampleComponent,
        TabExampleEventComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve sempre iniciar com a primeira aba selecionada, em caso de nenhuma ser informada com o atributo "selected"', () => {
    const tabSelected = fixture.debugElement.query(By.css('.--selected'));
    expect(tabSelected.nativeElement.textContent.trim()).toBe('Tab 1');
  });

  it('Deve conter o texto correto no header da tab', () => {
    const headerItens = fixture.debugElement.queryAll(By.css('.header-item'));
    expect(headerItens[0].nativeElement.textContent.trim()).toBe('Tab 1');
    expect(headerItens[1].nativeElement.textContent.trim()).toBe('Tab 2');
    expect(headerItens[2].nativeElement.textContent.trim()).toBe('Tab 3');
    expect(headerItens[3].nativeElement.textContent.trim()).toBe('aa');
  });

  it('Ao clicar na TAB 2, ela deve ficar selecionada', () => {
    const tab1Selected = fixture.debugElement.query(By.css('.--selected'));
    expect(tab1Selected.nativeElement.textContent.trim()).toBe('Tab 1');
    const item = fixture.debugElement.queryAll(By.css('.header-item'))[1].nativeElement;
    item.click();
    fixture.detectChanges();
    const tab2Selected = fixture.debugElement.query(By.css('.--selected'));
    expect(tab2Selected.nativeElement.textContent.trim()).toBe('Tab 2');
  });

  it('Ao clicar para adicionar, deve adiconar uma tab na direita e marcar ela como selecionada', () => {
    const addButton = fixture.debugElement.query(By.css('#button-add')).nativeElement;
    addButton.click();
    fixture.detectChanges();
    const tab2Selected = fixture.debugElement.query(By.css('.--selected'));
    expect(tab2Selected.nativeElement.textContent.trim()).toBe('0');
    const headerItens = fixture.debugElement.queryAll(By.css('.header-item'));
    expect(headerItens[4].nativeElement.textContent.trim()).toBe('0');
  });

  it('Ao clicar para remover a ultima tab ela deve ser removida, e a primeira tab disponivel a sua esquerda selecionada', () => {
    const addButton = fixture.debugElement.query(By.css('#button-add')).nativeElement;
    addButton.click();
    fixture.detectChanges();
    const item = fixture.debugElement.query(By.css('#button-remove')).nativeElement;
    item.click();
    fixture.detectChanges();
    const selected = fixture.debugElement.query(By.css('.--selected'));
    expect(selected.nativeElement.textContent.trim()).toBe('aa');
  });

  it('Caso tab seja informada com atributo "disabled", deve aparecer desabilitado ', () => {
    const tabDisabled = fixture.debugElement.query(By.css('.--disabled'));
    expect(tabDisabled).toBeTruthy();
  });

  it('Ao Selecionar uma tab, deve emitir evento com o id da tag', () => {
    const fixtureEventComponent = TestBed.createComponent(TabExampleEventComponent);
    spyOn(window, 'alert');
    fixtureEventComponent.detectChanges();
    expect(window.alert).toHaveBeenCalledWith('Tab 1');
  });
});

@Component({
  template: `
<div>
<alb-tab-group (selectedTabChange)="selectedTabChange($event)">
  <alb-tab>
    <ng-template albTabHeaderWrapper>Tab 1</ng-template>
    <ng-template albTabBodyWrapper>Conteudo da TAB 1</ng-template>
  </alb-tab>
  <alb-tab>
    <ng-template albTabHeaderWrapper>Tab 2</ng-template>
    <ng-template albTabBodyWrapper>Conteudo da TAB 2</ng-template>
  </alb-tab>
  <alb-tab disabled>
    <ng-template albTabHeaderWrapper>Tab 3</ng-template>
    <ng-template albTabBodyWrapper>Conteudo da TAB 3</ng-template>
  </alb-tab>
  <alb-tab label="aa">
    <ng-template albTabBodyWrapper>AA</ng-template>
  </alb-tab>
  <alb-tab *ngFor="let tab of tabs" [id]="tab" [label]="tab" selected>
    <ng-template albTabBodyWrapper><button id="button-remove" (click)="removeTab(tab)">Remover</button></ng-template>
  </alb-tab>
  <div aside>
    <button id="button-add" (click)="addTab()">Click</button>
  </div>
</alb-tab-group>
</div>
  `
})
class TabExampleComponent {
  tabs = [];
  count = 0;

  selectedTabChange(tabId) {
    console.log(tabId);
  }

  addTab() {
    this.tabs.push(`${this.count++}`);
  }

  removeTab(tab) {
    this.tabs.splice(this.tabs.indexOf(this.tabs.find(t => t === tab)), 1);
  }
}

@Component({
  template: `
<div>
<alb-tab-group (selectedTabChange)="selectedTabChange($event)">
  <alb-tab id="Tab 1">
    <ng-template albTabHeaderWrapper>Tab 1</ng-template>
    <ng-template albTabBodyWrapper>Conteudo da TAB 1</ng-template>
  </alb-tab>
</alb-tab-group>
</div>
  `
})
class TabExampleEventComponent {
  selectedTabChange(tabId) {
    window.alert(tabId);
  }
}
