import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ConciliacaoContabilAnalitico } from 'src/app/shared/model/conciliacao-contabil-analitico';
import { HttpClientService } from 'src/app/shared/service/http-client.service';
import { DateFormatHelper } from '../../shared/helper/date-format-helper';


@Injectable({
  providedIn: 'root'
})
export class ConciliacaoContabilService {


  constructor(private httpClientService: HttpClientService) {
  }

  // gerarDados(dataInicio: Date, dataFim: Date, empresa: string): Observable<any>{
  //   const datai = DateFormatHelper.toUrlDate(dataInicio);
  //   const dataf = DateFormatHelper.toUrlDate(dataFim);
    
  //   const caminho = `transacao/exporta/conciliacao/contabil/${datai}/${dataf}/${empresa}`;
  //   return this.httpClientService.pix.post({ path: caminho});
  // }

  // download(path: string):Observable<any>{
  //   return this.httpClientService.pix.get({path});
  // }

  gerarExcel(dataInicio: string, dataFim: string, empresa: string,  contabilContaBancaria: string, contabilFormaPagamento:string, contabilHistoricoPadrao: string, contabilCliente: string, contabilNatureza: string, contabilCentroCusto: string): Observable<any>{
     const datai = DateFormatHelper.toUrlDate(dataInicio);
     const dataf = DateFormatHelper.toUrlDate(dataFim);

    const path = `boleto/conciliacao/excel/${datai}/${dataf}/${empresa}/${contabilContaBancaria}/${contabilFormaPagamento}/0/0/${contabilNatureza}/${contabilCentroCusto}`;
    const options = { observe: 'response', responseType: 'blob' };

    return this.httpClientService.core.postOption({ path, options });
  }


  listarConcilicaoContabilAnalitico(params?: {dataInicio: string, dataFim: string, empresa: string, contabilContaBancaria: string, contabilFormaPagamento:string, 
        contabilNatureza: string, contabilCentroCusto: string}): Observable<ConciliacaoContabilAnalitico[]>{
    const datai = DateFormatHelper.toUrlDate(params.dataInicio);
    const dataf = DateFormatHelper.toUrlDate(params.dataFim);
  
    const caminho = `transacao/consulta/conciliacao/contabil/${datai}/${dataf}/${params.empresa}/${params.contabilContaBancaria}/${params.contabilFormaPagamento}/0/0/${params.contabilNatureza}/${params.contabilCentroCusto}`;
//    const caminho = `transacao/consulta/conciliacao/contabil/${datai}/${dataf}/${params.empresa}/${params.contabilContaBancaria}/${params.contabilFormaPagamento}/${params.contabilHistoricoPadrao}/${params.contabilCliente}/${params.contabilNatureza}/${params.contabilCentroCusto}`;
    return this.httpClientService.pix.find<ConciliacaoContabilAnalitico[]>({ path: caminho});
  }

//  exportarExcel(mes: string, ano: string, empresa: string): Observable<any> {
//    const path = `transacao/exporta/conciliacao/contabil/${mes}/${ano}/${empresa}`;
//    const options = { observe: 'response', responseType: 'blob' };
//    return this.httpClientService.core.postOption({ path, body, options });
//  }

}
