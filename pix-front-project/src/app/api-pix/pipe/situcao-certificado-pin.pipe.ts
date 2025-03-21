import { Pipe, PipeTransform } from '@angular/core';
import { SituacaoCertificadoUsuarioRecebedorEnum } from '../enum/SituacaoCertificadoUsuarioRecebedorEnum';

@Pipe({
  name: 'situcaoCertificadoPin'
})
export class SitucaoCertificadoPinPipe implements PipeTransform {

  transform(value: SituacaoCertificadoUsuarioRecebedorEnum, ...args: unknown[]): unknown {
    switch (value) {
      case SituacaoCertificadoUsuarioRecebedorEnum.SemCertificado: return 'red';
      case SituacaoCertificadoUsuarioRecebedorEnum.CertificadoCriado: return 'green';
      default: return 'red';
    }
  }

}
