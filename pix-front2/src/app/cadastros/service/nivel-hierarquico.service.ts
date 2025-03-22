import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpClientService } from 'src/app/shared/service/http-client.service';

import { NivelHierarquico } from '../model/nivelHierarquico';

@Injectable({
  providedIn: 'root'
})
export class NivelHierarquicoService {
  constructor(private httpClientService: HttpClientService) { }

  listarNivelHierarquico(): Observable<NivelHierarquico[]>{
    const path = 'alcada/nivel-hierarquico';

    return this.httpClientService.pix.find<NivelHierarquico[]>({
      path, responseType: NivelHierarquico
    });
  }

  salvarNivelHierarquico(nivelHierarquico: NivelHierarquico): Observable<any>{
    const path = 'alcada/nivel-hierarquico';

    const body = nivelHierarquico;

    return this.httpClientService.pix.post({
      path, body
    });
  }

  atualizarNivelHierarquico(nivelHierarquico: NivelHierarquico, idNivelHierarquico: number): Observable<any>{
    const path = `alcada/nivel-hierarquico/${idNivelHierarquico}`;

    const body = nivelHierarquico;

    return this.httpClientService.pix.put({ path, body });
  }

  excluirNivelHierarquico(nivelHierarquicoID: number): Observable<any>{
    const path = `alcada/nivel-hierarquico/${nivelHierarquicoID}`;

    return this.httpClientService.pix.delete({ path });
  }
}
