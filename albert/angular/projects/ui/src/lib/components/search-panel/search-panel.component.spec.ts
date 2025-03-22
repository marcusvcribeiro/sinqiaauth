import { NgSelectModule } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPanelChipDirective } from 'projects/ui/src/lib/components/search-panel/search-panel-chip.directive';
import { SearchPanelChipsInterface, SearchPanelOptions } from 'projects/ui/src/lib/components/search-panel/search-panel';
import { Component, ViewChildren, QueryList } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPanelModule } from './search-panel.module';

describe('SearchPanelModule', () => {
  let pageSimpleFixture: ComponentFixture<PageSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SearchPanelModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        PageSimpleComponent,
        PageFormComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    pageSimpleFixture = TestBed.createComponent(PageSimpleComponent);
    pageSimpleFixture.detectChanges();
  });

  it('Deve ser criado um Search Panel', () => {
    const searchPanelElement = document.querySelector('.alb-search-panel');
    expect(searchPanelElement).toBeTruthy();
  });

  it('Deve ser exibido o panel de pesquisa',  fakeAsync(() => {
    const butonPanel = document.querySelector('.alb-filter span') as HTMLElement;
    butonPanel.click();
    tick(1000);
    const searchPanelElement = document.querySelector('app-form-page');
    expect(searchPanelElement).toBeTruthy();
  }));

});

@Component({
  selector: 'app-form-page',
  template: `
    <div class="inputs" [formGroup]="form">
        <alb-input placeholder="Teste chips 1" formControlName="teste" alb-search-panel-chip></alb-input>
        <alb-input placeholder="Teste chips 2" formControlName="testePlaceholder"
        chipPlaceholder="Teste Placeholder" alb-search-panel-chip></alb-input>
        <alb-input placeholder="Teste chips 3" formControlName="semPlaceholder"
        [disableChipPlaceholder]="true" alb-search-panel-chip></alb-input>
        <ng-select alb-search-panel-chip chipValueTransformer="label"
                appendTo="body"
                class="alb-ng-select"
                [items]="list"
                placeholder="Teste chips 4"
                formControlName="transformerChave"></ng-select>
        <ng-select alb-search-panel-chip chipValueTransformer="transformerTeste"
                appendTo="body"
                class="alb-ng-select"
                [items]="list"
                placeholder="Teste chips 5"
                formControlName="transformerFunction"></ng-select>
    </div>
    <div alb-panel-actions>
      <button alb-button>Teste</button>
    </div>
  `
})
class PageFormComponent implements SearchPanelChipsInterface {

  @ViewChildren(SearchPanelChipDirective) chips: QueryList<SearchPanelChipDirective>;
  form: FormGroup;

  list = [
    {
      label: 'Label 1',
      key: 'label1'
    },
    {
      label: 'Label 2',
      key: 'label2'
    },
  ];

  constructor(protected formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      teste: [],
      testePlaceholder: [],
      semPlaceholder: [],
      transformerChave: [],
      transformerFunction: []
    });
  }

  transformerTeste($event) {
    return $event.label;
  }

}

@Component({
  selector: 'app-simple-page',
  template: `
    <p>Hello Panel!</p>
    <alb-search-panel [options]="searchPanelOptions"></alb-search-panel>
  `
})
class PageSimpleComponent {
  searchPanelOptions: SearchPanelOptions = {
    component: PageFormComponent
  };
  constructor() { }
}
