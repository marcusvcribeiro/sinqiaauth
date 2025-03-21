import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MarcacaoFraude } from "src/app/shared/model/marcacao-fraude";
import { HttpClientService } from "src/app/shared/service/http-client.service";

@Injectable({
    providedIn: 'root'
})
export class MarcacaFraudeService {
    constructor(private httpClientService: HttpClientService) { }

    listarMarcacoesFraude(params?: { dataInicio: Date, dataFim: Date })
        : Observable<MarcacaoFraude[]> {
        const caminho = 'marcacao-fraude';

        return this.httpClientService.core.find({ queryObj: params, path: caminho });
    }

    exportarMarcacoesFraude(body : any, excelNome: any)
        : Observable<any> {
            const path = `relatorio/download/${excelNome}`;
            const options = { observe: 'response', responseType: 'blob' };
            return this.httpClientService.relatorios.postOption({
              path, body, options
            });
    }
}