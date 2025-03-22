import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Toast } from './toast';
import { animationsDuration, toastAnimations, ToastAnimationState } from './toast.animation';
import { ToastRef } from './toastRef';

@Component({
  selector: 'alb-toast',
  templateUrl: './toast.component.html',
  animations: [toastAnimations.fadeToast],
})

// TODO: refactor do componente para simplificar.
export class ToastComponent implements OnInit, OnDestroy {

  /**
   * @description
   * O Input closed é usado para setar o "lastToast" como undefined no toast.service.
   *
   */
  @Output() closed = new EventEmitter();

  animationsSetTimeout = animationsDuration * 10;

  animationsClearTimeout = animationsDuration * 16;

  animationState: ToastAnimationState = 'default';

  /**
   * @description
   * Objeto utilizado para relacionar o tipo do toast ao ícone.
   *
   */
  icon = {
    info: 'info',
    error: 'cancel',
    success: 'check_circle',
    alert: 'error',
    regular: 'remove_circle'
  };

  constructor(public toast: Toast, public ref: ToastRef) {}

  ngOnInit() {
    setTimeout(() => this.animationState = 'closing', this.animationsSetTimeout);
  }

  ngOnDestroy() {
    clearTimeout(this.animationsClearTimeout);
  }

  onClose() {
    this.ref.close();
    this.closed.emit();
  }

  getColor() {
    return 'alb-toast-' + [ this.toast.type ? this.toast.type : 'regular' ];
  }

  onAnimationDone(event) {
    if (event.toState === 'closing') {
      this.ref.close();
      this.closed.emit();
    }
  }

}
