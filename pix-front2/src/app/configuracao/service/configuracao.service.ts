import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/shared/service/http-client.service';
import { ParametrosGerais } from 'src/app/shared/model/parametros-gerais';
import { CertificadoraDigital } from 'src/app/shared/model/certificadora-digital';
import { CertificadoDigitalContato } from 'src/app/shared/model/certificado-digital-contato';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoService {

  constructor(private httpClientService: HttpClientService) { }

  carregarParametrosGerais(): Observable<ParametrosGerais>{
    const path = 'parametros';
    return this.httpClientService.core.find<ParametrosGerais>({path});
  }

  atualizarParametrosGerais(body: ParametrosGerais): Observable<void>{
    const path = 'parametros';
    return this.httpClientService.core.put<void>({path, body});
  }

  listarCertificadoraDigital(): Observable<CertificadoraDigital[]> {
    const path = 'parametros/certificadora-digital';
    return this.httpClientService.core.find<CertificadoraDigital[]>({ path });
  }

  listarCertificadoigitalContato(): Observable<CertificadoDigitalContato[]> {
    const path = 'parametros/certificado-digital-contato';
    return this.httpClientService.core.find<CertificadoDigitalContato[]>({ path });
  }

  atualizaCertificadoDigitalContato(body: CertificadoDigitalContato[]): Observable<void>{
    const path = 'parametros/certificado-digital-contato';
    return this.httpClientService.core.put<void>({path, body});
  }
}
