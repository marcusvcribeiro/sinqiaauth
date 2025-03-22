import { Component, AfterContentInit, ElementRef } from '@angular/core';

@Component({
  selector: 'alb-container',
  templateUrl: './container.component.html',
  host: {
    'class': 'alb-container',
    '[class.has-header]': 'hasHeader',
    '[class.has-sidenav]': 'hasSidenav',
    '[class.has-bottom-sheet]': 'hasBottomSheet',
    '[class.has-smart-panel]': 'hasSmartPanel',
    '(bottomSheetAdded)': 'bottomSheetAdded($event)'
  }
})

export class ContainerComponent implements AfterContentInit {

  hasHeader: boolean;
  hasSidenav: boolean;
  hasBottomSheet: boolean;
  hasSmartPanel: boolean;

  constructor(
    private elementRef: ElementRef
  ) { }

  ngAfterContentInit() {
    this._checkIfHasHeaderOrSidenav();
  }

  /**
   * @description
   * Método que verifica se existe um bottom-sheet no container
   */
  bottomSheetAdded(event) {
    this.hasBottomSheet = event.detail.hasBottomSheet;
  }

  /**
   * @description
   * Método que verifica se há um elemento com a classe alb-container-header ou alb-container-sidenav.
   */
  private _checkIfHasHeaderOrSidenav() {
    this.hasBottomSheet = false;
    this.hasHeader = !!this.elementRef.nativeElement.querySelector('.alb-container-header');
    this.hasSidenav = !!this.elementRef.nativeElement.querySelector('.alb-container-sidenav');
    this.hasSmartPanel = !!this.elementRef.nativeElement.querySelector('.alb-smart-panel');
  }
}
