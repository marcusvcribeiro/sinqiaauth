import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResult } from 'src/app/shared/model/list-result';
import { CertificadoDigital } from '../../shared/model/certificado-digital';
import { FinalidadeCertificadoDigital } from '../../shared/model/finalidade-certificado-digital';
import { SituacaoCertificadoDigital } from '../../shared/model/situacao-certificado-digital';
import { HttpClientService } from '../../shared/service/http-client.service';
import { CertificadoraDigital } from 'src/app/shared/model/certificadora-digital';

@Injectable({
  providedIn: 'root'
})
export class CertificadoDigitalService {
  constructor(private httpClientService: HttpClientService) { }

  listarCertificadosDigitais(params?: { idSituacaoCertificadoDigital: number, idFinalidadeCertificadoDigital: number })
    : Observable<ListResult<CertificadoDigital>> {
    const caminho = 'certificado-digital';

    return this.httpClientService.core.find({ queryObj: params, path: caminho });
  }

  listarFinalidadesCertificados(): Observable<FinalidadeCertificadoDigital[]> {
    const caminho = 'certificado-digital/finalidade';

    return this.httpClientService.core.find({ path: caminho });
  }

  listarSituacoesCertificados(): Observable<SituacaoCertificadoDigital[]> {
    const caminho = 'certificado-digital/situacao';

    return this.httpClientService.core.find({ path: caminho });
  }

  importarCertificadoDigital(file: File, params?: { senhaCertificado: string, idFinalidadeCertificadoDigital: number, usuarioRecebedor: number }): Observable<any> {
    const caminho = 'certificado-digital';
    const formData = new FormData();

    formData.append('file', file, file.name);

    return this.httpClientService.core.post({ queryObj: params, path: caminho, body: formData, options: { reportProgress: true } });
  }

  gerarCertificadoApiPix(usuarioRecebedor: number): Observable<any> {
    const path = `certificado-digital/self-signed/api-pix/${usuarioRecebedor}`;
    return this.httpClientService.core.post({ path });
  }

  getCertificadoraDigitalHabilitadaApiPix():  Observable<CertificadoraDigital> {
    const caminho = 'parametros/certificadora-digital-habilitada';
    return this.httpClientService.core.find({ path: caminho});
  }
}
