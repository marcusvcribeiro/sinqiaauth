import { ComponentRef } from '@angular/core';
import { DialogComponent } from './dialog.component';

/**
 * @description
 * Classe criada para que o tipo Dialog seja válido.
 * type, title, message e btnPrimaryText são obrigatórias pois todos os tipos de dialog as possuem.
 * callback, btnColor e btnSecondaryText são apenas utilizadas quando a dialog é do tipo confirm,
 * e não aparecem se a tipagem estiver incorreta.
 *
 */
class Dialog {
  type: 'confirm' | 'error' | 'info';
  title: string;
  message: string;
  btnPrimaryText: string;
  callback?: any;
  btnColor?: string;
  btnSecondaryText?: string;
  component?: any;
  componentProps?: any;
}

/**
 * @description
 * Classe criada para que o tipo CustomDialog seja válido.
 */
class DialogCustom {
  type: 'custom';
  component?: any;
  componentProps?: any;
}

/**
 * @description
 * Classe criada para referenciar tipos dentro da promise.
 */
class DialogRef {
  component: ComponentRef<any>;
  dialogComponent: ComponentRef<DialogComponent>;
}

export { Dialog, DialogCustom, DialogRef };

