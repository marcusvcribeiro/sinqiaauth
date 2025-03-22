import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'alb-display',
  templateUrl: './display.component.html',
  host: {
    'class': 'alb-display',
  }
})
export class DisplayComponent implements AfterViewInit {

/**
 * @description
 * Input utilizado para adicionar o título do componente.
 *
 */
  @Input() title: string;

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
