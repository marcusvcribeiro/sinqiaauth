import { Pipe, PipeTransform } from '@angular/core';
import { SituacaoCertificadoUsuarioRecebedorEnum } from '../enum/SituacaoCertificadoUsuarioRecebedorEnum';

@Pipe({
  name: 'situcaoCertificadoDescricao'
})
export class SitucaoCertificadoDescricaoPipe implements PipeTransform {

  transform(value: SituacaoCertificadoUsuarioRecebedorEnum, ...args: unknown[]): unknown {
    switch (value) {
      case SituacaoCertificadoUsuarioRecebedorEnum.SemCertificado: return 'Sem certificado';
      case SituacaoCertificadoUsuarioRecebedorEnum.CertificadoCriado: return 'Certificado Criado';
      default: return 'Sem certificado';
    }
  }

}
