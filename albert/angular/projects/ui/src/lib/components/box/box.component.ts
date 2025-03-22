import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'alb-box',
  templateUrl: './box.component.html',
  host: {
    'class': 'alb-box',
    '[class.formview]': 'formview',
  }
})
export class BoxComponent implements AfterViewInit {

/**
 * @description
 *
 * Título do alb-box, o valor String passado dentro do input, na tag.
 *
 */

  @Input() title: string;

/**
 *
 * @description
 * O Input "formview" é utilizado quando o box agrupa elementos como radiobuttons ou checkboxs.
 * Assim como o nome diz, ele tem a aparência de um alb-input.
 *
 */
  @Input() formview: boolean;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.removeAttributeTitle();
  }

  /**
   * Este método foi feito apenas para remover o atributo title da tag do componente,
   * pois se manter esse atributo, o navegator irá interpretar como um elemento do HTML 5
   * com isso criando um tooltipo acima do componente
   *
   * TODO: Tentar encontrar uma solução utilizando o Angular
   */
  removeAttributeTitle() {
    const host: HTMLElement = this.elementRef.nativeElement;
    host.removeAttribute('title');
  }

}
