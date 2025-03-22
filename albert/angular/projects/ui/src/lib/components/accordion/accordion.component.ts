import { Component, Directive, Input } from '@angular/core';
@Component({
  selector: 'alb-accordion',
  templateUrl: './accordion.component.html'
})
class AccordionComponent {

  /**
   * @description
   * Nome do ícone no accordion
   */
  @Input() icon: string;

  /**
   * @description
   * Título do accordion
   */
  @Input() title: string;

  /**
   * @description
   * Boolean que define se o accordion vai começar aberto ou fechado
   */
  @Input() open = false;

  toggle() {
    this.open = !this.open;
  }

}

@Directive({
  selector: 'albAccordionHeader',
})
class AccordionHeaderDirective { }

export { AccordionComponent, AccordionHeaderDirective };
