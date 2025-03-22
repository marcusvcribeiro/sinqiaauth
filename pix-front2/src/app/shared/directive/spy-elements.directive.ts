import { Directive, AfterViewInit, Input, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';

export interface SpyConfig {
  elements: string;
  options: object;
}

@Directive({
  selector: '[sqSpyElements]'
})
export class SpyElementsDirective implements AfterViewInit, OnDestroy {
  @Input() sqSpyElements: SpyConfig;
  @Output() trigger = new EventEmitter<IntersectionObserverEntry>();
  elements: HTMLElement[];
  observer: IntersectionObserver;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const { nativeElement } = this.elementRef;
    this.elements = Array.from(nativeElement.querySelectorAll(this.sqSpyElements.elements));
    this.observer = this.createObserver(this.elements);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  createObserver(elements) {
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.trigger.emit(entry);
        }
      });
    }, this.sqSpyElements.options);

    elements.forEach(element => observer.observe(element));

    return observer;
  }

}
