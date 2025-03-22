import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChild, Input, OnDestroy, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { TabBodyWrapperDirective } from './tab-body.directive';
import { TabGroupComponent } from './tab-group.component';
import { TabHeaderWrapperDirective } from './tab-header.directive';

/**
 * @description
 * Componente tab
 * serve para criar uma tab, necessita estar dentro de um alb-tab-group para funcionar
 */
@Component({
  selector: 'alb-tab',
  templateUrl: './tab.component.html'
})
export class TabComponent implements OnInit, OnDestroy {

  /**
   * @description
   * Tab header
   * quando informado alguem ng-template com a diretiva 'TabHeaderWrapperDirective' é possivel recupera-lo atraves dessa variavel
   */
  @ContentChild(TabHeaderWrapperDirective) tabHeader: TabHeaderWrapperDirective;

  /**
   * @description
   * Tab body
   * quando informado alguem ng-template com a diretiva 'TabBodyWrapperDirective' é possivel recupera-lo atraves dessa variavel
   */
  @ContentChild(TabBodyWrapperDirective) tabBody: TabBodyWrapperDirective;

  /**
   * @description
   * Id da tab
   * caso nao seja informado gera automaticamente
   */
  @Input() id = uuidv4();

  /**
   * @description
   * Label da tab
   * Caso informada sobreescreve o tab header
   */
  @Input() label: string;

  /**
   * @description
   * Disabled
   * Caso informada marca a tab como disabled
   */
  _disabled: boolean;
  @Input()
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
  }

  get disabled() {
    return this._disabled;
  }

  /**
   * @description
   * Disabled
   * Caso informada marca a tab como select
   */
  _selected: boolean;
  @Input()
  set selected(selected: boolean) {
    this._selected = coerceBooleanProperty(selected);
  }

  get selected() {
    return this._selected;
  }

  constructor(private tabGroupComponentParent: TabGroupComponent) { }

  ngOnInit() {
    this.tabGroupComponentParent.addTab(this);
  }

  ngOnDestroy(): void {
    this.tabGroupComponentParent.removeTab(this);
  }
}
