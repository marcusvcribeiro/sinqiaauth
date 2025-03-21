import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpClientService } from 'src/app/shared/service/http-client.service';

import { ParticipanteIndireto } from '../model/participanteIndireto';
import { ParticipanteIndiretoAcesso } from '../model/participanteIndiretoAcesso';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteIndiretoService {
  constructor(private httpClientService: HttpClientService) { }

  listarParticipanteIndireto(): Observable<ParticipanteIndireto[]>{
    const path = 'cadastro/participante-indireto';

    return this.httpClientService.pix.find<ParticipanteIndireto[]>({
      path, responseType: ParticipanteIndireto
    });
  }

  obterAcessoParticipanteIndireto(identificador: number): Observable<ParticipanteIndiretoAcesso[]>{
    return this.httpClientService.core.find<ParticipanteIndiretoAcesso[]>({
      path: `participanteIndiretoAcesso/${identificador}`
      });
  }

  criarAcessoParticipanteIndireto(complemento:any, identificador:number): Observable<ParticipanteIndiretoAcesso[]>{
    const body = complemento;
    const path =  `participanteIndiretoAcesso/${identificador}/gerar-credenciais`;
    return this.httpClientService.core.post({path,body});
  }

  deletarAcessoParticipanteIndireto(credencialId: number): Observable<any>{
    const path = `participanteIndiretoAcesso/${credencialId}`;
    return this.httpClientService.core.delete({ path });
  }

  salvarParticipanteIndireto(ParticipanteIndireto: ParticipanteIndireto): Observable<any>{
    const path = 'cadastro/participante-indireto';

    const body = ParticipanteIndireto;

    return this.httpClientService.pix.post({
      path, body
    });
  }

  atualizarParticipanteIndireto(ParticipanteIndireto: ParticipanteIndireto, idParticipanteIndireto: number): Observable<any>{
    const path = `cadastro/participante-indireto/${idParticipanteIndireto}`;

    const body = ParticipanteIndireto;

    return this.httpClientService.pix.put({ path, body });
  }

  excluirParticipanteIndireto(ParticipanteIndiretoID: number): Observable<any>{
    const path = `cadastro/participante-indireto/${ParticipanteIndiretoID}`;

    return this.httpClientService.pix.delete({ path });
  }
}
