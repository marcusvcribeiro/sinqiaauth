import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensagem-visualizacao-xml',
  templateUrl: './mensagem-visualizacao-xml.component.html',
  styleUrls: ['./mensagem-visualizacao-xml.component.scss'],
})
export class MensagemVisualizacaoXmlComponent implements OnInit {

  @Input() descricaoMensagem: string;
  visualizacaoXml$: any;

  constructor() {
  }

  ngOnInit() {
    this.visualizacaoXml$ = this.descricaoMensagem;
  }
}
