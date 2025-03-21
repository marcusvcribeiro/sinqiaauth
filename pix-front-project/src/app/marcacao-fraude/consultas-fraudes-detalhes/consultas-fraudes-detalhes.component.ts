import { Component, Input, OnInit } from '@angular/core';
import { ConsultaFraude } from 'src/app/shared/model/consulta-fraude';
import { MensagemVisualizacaoXmlComponent } from '../mensagem-visualizacao-xml/mensagem-visualizacao-xml.component';
import { TranslateService } from '@ngx-translate/core';
import { DrawerService } from '@albert/ui';

@Component({
  selector: 'app-consultas-fraudes-detalhes',
  templateUrl: './consultas-fraudes-detalhes.component.html',
  styleUrls: ['./consultas-fraudes-detalhes.component.scss']
})
export class ConsultasFraudesDetalhesComponent implements OnInit {

  @Input() detalhes: ConsultaFraude[] = [];
  constructor(private drawerService: DrawerService,
      private translateService: TranslateService) { }

  ngOnInit(): void {

  }

  onVisualizarXml(mensagem: string) : void{
   this.drawerService.create({
      component: MensagemVisualizacaoXmlComponent,
      size: 'medium',
      title: this.translateService.instant('botao.visualizarXml'),
      componentProps: { descricaoMensagem: mensagem },
    });
  }

}
