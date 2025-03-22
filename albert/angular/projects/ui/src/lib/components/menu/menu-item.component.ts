import { Component, ContentChild, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { MenuTemplateDirective } from './menu-item-template.directive';
import { MenuComponent } from './menu.component';

/**
 *
 * @description
 *
 * Componente menu-item.
 * Item do menu, que possui Id, label e output de click. Com relação à exibição, pode ser utilizado de forma simples,
 * passando apenas o label através de input ou caso se deseje detalhar melhor o template, é possível passar dentro
 * dele um <ng-template albMenuTemplate> com o conteúdo que se espera exibir como label.
 */
@Component({
  selector: 'alb-menu-item',
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent implements OnInit {
  /**
   *
   * @description
   *
   * Label do menu item. Caso informado junto com o template, o template irá se sobressair ao label.
   */
  @Input() label: string;

  /**
   * @description
   * Id do item.
   * Caso não seja informado gera automaticamente.
   */
  @Input() id: string = uuidv4();

  /**
   * @description
   *
   * Deixa o item desabilitado para click.
   */
  @Input() disabled: boolean;

  /**
   *
   * @description
   *
   * Output de click que informa que o item foi clicado emitindo o valor do seu ID.
   */
  @Output() click: EventEmitter<string> = new EventEmitter();

  /**
   *
   * @description
   *
   * Content referente ao template que foi informado dentro da tag menu-item.
   */
  @ContentChild(MenuTemplateDirective) content: MenuTemplateDirective;

  constructor(private menuGroupComponentParent: MenuComponent) { }

  // override
  ngOnInit() {
    this.menuGroupComponentParent.addMenuItem(this);
  }

  /**
   *
   * @description
   *
   * Método que quando chamado emite evento através output click informando qual é o Id o menu-item selecionado.
   */
  onClick() {
    this.click.emit(this.id);
  }

}

