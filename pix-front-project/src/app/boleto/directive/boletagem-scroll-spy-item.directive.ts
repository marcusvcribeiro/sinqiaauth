import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { BoletoSidenavService } from '../service/boletagem-sidenav.service';

@Directive({
  selector: '[boletagemSpyItem]'
})
export class BoletagemScrollSpyItemDirective implements AfterViewInit {
  private id;

  constructor(private el: ElementRef,
    private boletagemSidenavService: BoletoSidenavService) {
  }

  ngAfterViewInit(): void {
    this.id = this.el.nativeElement.getAttribute('data-scroll-spy-id');
    this.createObserver();
  }

  private createObserver(): void {
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.boletagemSidenavService.atualizarIdSelecionado(this.id);
        }
      });
    }, { threshold: 1.0 });

    observer.observe(this.el.nativeElement);
  }
}
