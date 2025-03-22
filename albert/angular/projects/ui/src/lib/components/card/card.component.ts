import { AfterViewInit, Component, Directive, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'alb-card',
  templateUrl: './card.component.html',
  host: {
    'class': 'alb-card',
  }
})
export class CardComponent implements AfterViewInit {

/**
 * @description
 *
 * Título do alb-card, o valor String passado dentro do input, na tag.
 *
 */
  @Input() title: string;

/**
 * @description
 *
 * sub título do alb-card, o valor String passado dentro do input, na tag.
 *
 */
  @Input() subTitle: string;

/**
 * @description
 *
 * Icone do header do alb-card, o valor String passado dentro do input, na tag.
 *
 */
  @Input() icon: string;


  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.removeAttributeTitle();
    this.removeHeaderBorder();
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

  removeHeaderBorder() {
    const host: HTMLElement = this.elementRef.nativeElement;
    const firstChild = host.querySelector('.alb-card-body> :first-child');
    if (firstChild === host.querySelector('alb-tab-group')
    || firstChild === host.querySelector('.alb-table')) {
      host.querySelector('.alb-card-header').classList.add('borderless');
      host.querySelector('.alb-card-body').setAttribute('style', 'padding:0px');
    }
  }
}

@Directive({
  selector: 'alb-card-aside',
  host: {
    'class': 'alb-card-aside'
  },
})
export class CardAsideDirective { }


@Directive({
  selector: 'alb-card-footer',
  host: {
    'class': 'alb-card-footer'
  },
})
export class CardFooterDirective { }


