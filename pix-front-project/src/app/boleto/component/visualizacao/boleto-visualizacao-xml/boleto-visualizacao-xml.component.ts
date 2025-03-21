import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoletagemConsultaService } from 'src/app/boletagem-consulta/service/boletagem.service';

@Component({
  selector: 'app-boleto-visualizacao-xml',
  templateUrl: './boleto-visualizacao-xml.component.html',
  styleUrls: ['./boleto-visualizacao-xml.component.scss'],
})
export class BoletoVisualizacaoXmlComponent implements OnInit {

  @Input() dataTransacao: string;
  @Input() idTransacao: number;
  @Input() codMensagem: string;
  @Input() idSistemaEnvioMensagem: number;
  visualizacaoXml$: Observable<any>;

  constructor(private boletagemConsultaService: BoletagemConsultaService) {
  }

  ngOnInit() {
    this.visualizacaoXml$ = this.boletagemConsultaService.listarXml(this.dataTransacao, this.idTransacao, this.codMensagem, this.idSistemaEnvioMensagem ? this.idSistemaEnvioMensagem : 0).pipe(map(value => value.xml));
  }
}
