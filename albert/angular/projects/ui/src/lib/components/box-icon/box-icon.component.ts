import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'alb-box-icon',
  templateUrl: './box-icon.component.html',
})
export class BoxIconComponent {

  /**
   * @description
   * Nome do ícone no search
   */
  @Input() icon = 'filter_list';

  /**
   * @description
   * Variável utilizada para apontar se o box-icon está sendo usado no filtro.
   * Caso true, o ícone de seta orientado a direita passa a aparecer.
   */

  @Input() filter = false;

  /**
   * @description
   * Váriavel utilizada apenas para executar o estado da animação
   */
  isOpen = false;

  /**
   * @description
   * Váriavel utilizada para alterar as colunas.
   */
   @Input() albClass = '';

  /**
   * @description
   * Evento emitido quando troca o status de exibição do panel
   */
  @Output() toggleFilter = new EventEmitter<boolean>();

  onChange() {
    this.isOpen = !this.isOpen;
    this.toggleFilter.emit(this.isOpen);
  }
}
