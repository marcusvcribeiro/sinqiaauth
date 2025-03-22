import { CdkPortal } from '@angular/cdk/portal';
import { Directive } from '@angular/core';

/**
 *
 * @description
 *
 * Diretiva do alb menu template.
 * É responsável por indicar que um ng-template deve servir como alb-menu-template, sendo assim todo o conteúdo que for
 * escrito dentro do ng-template irá aparecer como label do item no menu. Caso o usuário passe somente um ng-template dentro do
 * menu-item nada irá acontecer.
 */
@Directive({
  selector: '[albMenuTemplate]'
})
export class MenuTemplateDirective extends CdkPortal {
}
