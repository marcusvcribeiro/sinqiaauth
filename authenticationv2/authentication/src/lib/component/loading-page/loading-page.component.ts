import { Component, Input } from '@angular/core';

@Component({
  selector: 'alb-loading-page',
  templateUrl: './loading-page.component.html',
})
export class LoadingPageComponent {
  @Input() label: string;

}
