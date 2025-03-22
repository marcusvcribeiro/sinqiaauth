import { AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alb-header--responsive',
  template: '<div class="header-responsive" #headerContent></div>',
  host: {
    class: 'alb-header--background',
  },
})
export class HeaderGroupComponent implements OnInit, AfterViewInit {

    @Input() albGroup: ElementRef;
    @Input() el: ElementRef;
    @Input() render: Renderer2;
    @ViewChild('headerContent') headerContent: ElementRef;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
      console.log('componentProps', this.albGroup);
      this.headerContent.nativeElement.appendChild(this.albGroup);
      this.render.appendChild(this.el.nativeElement, this.albGroup);
  }
}
