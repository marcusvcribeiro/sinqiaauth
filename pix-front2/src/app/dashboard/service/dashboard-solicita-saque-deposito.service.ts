import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from 'src/app/shared/service/http-client.service';
import { TransferenciaSPB } from './../model/transferencia';

@Injectable({
  providedIn: 'root'
})
export class DashboardSolicitaSaqueDepositoService {

  constructor(private httpClientService: HttpClientService) { }

  solicitarSaque(valor: number): Observable<any> {
    const path = `mensagem/transferencia-spb/saque`;
    let body = new TransferenciaSPB();
    body.valortransferencia = valor;

    return this.httpClientService.pix.post<any>({ path, body });
  }

  solicitarDeposito(valor: number): Observable<any> {
    const path = `mensagem/transferencia-spb/aporte`;
    let body = new TransferenciaSPB();
    body.valortransferencia = valor;

    return this.httpClientService.pix.post<any>({ path, body });
  }
}
