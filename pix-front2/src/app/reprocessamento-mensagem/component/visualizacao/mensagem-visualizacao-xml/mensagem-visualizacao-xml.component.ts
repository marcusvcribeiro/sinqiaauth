import { Component, Input, OnInit } from '@angular/core';
import { BoletagemConsultaService } from 'src/app/boletagem-consulta/service/boletagem.service';
import { Seg } from 'src/app/reprocessamento-mensagem/model/seg';

@Component({
  selector: 'app-mensagem-visualizacao-xml',
  templateUrl: './mensagem-visualizacao-xml.component.html',
  styleUrls: ['./mensagem-visualizacao-xml.component.scss'],
})
export class MensagemVisualizacaoXmlComponent implements OnInit {

  @Input() descricaoMensagem: string;
  visualizacaoXml$: any;

  seg: Seg = new Seg();
  constructor(private boletagemConsultaService: BoletagemConsultaService) {
  }

  ngOnInit() {
    this.visualizacaoXml$ = this.descricaoMensagem;
  }
}
