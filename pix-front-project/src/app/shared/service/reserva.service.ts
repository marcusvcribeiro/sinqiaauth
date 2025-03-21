import { Injectable } from '@angular/core';
import { DateFormatHelper } from '../helper/date-format-helper';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private httpClientService: HttpClientService) { }

  reprocessarReserva(dataReferencia: Date): Observable<any> {
    const path = `conta-pi/reprocessa/${DateFormatHelper.toUrlDate(dataReferencia)}`;
    return this.httpClientService.pix.delete({ path });
  }

}
