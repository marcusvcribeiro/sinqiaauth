import { CdkPortal } from '@angular/cdk/portal';
import { Directive } from '@angular/core';

/**
 * @description
 * TabBodyWrapperDirective diretiva utilizada para servir como template body
 */

@Directive({
  selector: '[albTabBodyWrapper]'
})
export class TabBodyWrapperDirective extends CdkPortal {

}
