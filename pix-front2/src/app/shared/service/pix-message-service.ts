import { ToastService, ModalService } from '@albert/ui';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageHelper } from '../helper/message-helper';

@Injectable({
  providedIn: 'root'
})
export class PixMessageService {
  constructor(private toastService: ToastService,
    private translateService: TranslateService) {
  }

  public toastSuccess(message: string) {
    this.toastService.create({
      type: 'success',
      text: this.translateService.instant(MessageHelper.extrairMensagem(message)),
    });
  }

  public toastInfo(message: string) {
    this.toastService.create({
      type: 'info',
      text: this.translateService.instant(MessageHelper.extrairMensagem(message)),
    });
  }

  public toastErro(message: string) {
    this.toastService.create({
      type: 'error',
      text: this.translateService.instant(MessageHelper.extrairMensagem(message)),
    });
  }

}

export class ConfirmButtons {
  static readonly LIBERAR_CANCELAR = new ConfirmButtons('LIBERAR_CANCELAR', 'botao.cancelar', 'botao.liberar', 'success');
  static readonly CANCELAR_NAO_CANCELAR = new ConfirmButtons('CANCELAR_NAO_CANCELAR', 'botao.naoCancelar', 'botao.cancelar', 'warn');

  // private para evitar serem criadas outras instancias dessa classe
  private constructor(
    private readonly key: string,
    public readonly btnFechar: string,
    public readonly btnOK: string,
    public readonly colorBtnOk: string) {
  }

  toString() {
    return this.key;
  }
}
