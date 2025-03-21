import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TemposAnsAnalitico } from 'src/app/shared/model/tempos-ans-analitico';
import { HttpClientService } from 'src/app/shared/service/http-client.service';
import { DateFormatHelper } from '../../shared/helper/date-format-helper';


@Injectable({
  providedIn: 'root'
})
export class TemposAnsService {


  constructor(private httpClientService: HttpClientService) {
  }

  gerarExcel(dataInicio: Date, dataFim: Date, empresa: string): Observable<any>{
     const datai = DateFormatHelper.toUrlDate(dataInicio);
     const dataf = DateFormatHelper.toUrlDate(dataFim);

    const path = `boleto/conciliacao/excel/${datai}/${dataf}/${empresa}`;
    const options = { observe: 'response', responseType: 'blob' };

    return this.httpClientService.core.postOption({ path, options });
  }


  listarTemposAns(): Observable<TemposAnsAnalitico[]>{
  
    const caminho = `transacao/consulta/tempos-ans`;
    return this.httpClientService.pix.find<TemposAnsAnalitico[]>({ path: caminho});
  }

  exportarExcel(body : any, excelNome: any): Observable<any> {
    const path = `relatorio/download/${excelNome}`;
    const options = { observe: 'response', responseType: 'blob' };
    return this.httpClientService.relatorios.postOption({
      path, body, options
    });
  }
}
