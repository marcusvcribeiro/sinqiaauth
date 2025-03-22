import { CdkPortal } from '@angular/cdk/portal';
import { Directive } from '@angular/core';

/**
 * @description
 * TabHeaderWrapperDirective diretiva utilizada para servir como template header
 */

@Directive({
  selector: '[albTabHeaderWrapper]'
})
export class TabHeaderWrapperDirective extends CdkPortal {
}
