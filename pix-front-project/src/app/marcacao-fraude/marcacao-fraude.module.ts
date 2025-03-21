import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcacaoFraudeRoutingModule } from './marcacao-fraude-routing.module';
import { MarcacaoFraudePrincipalComponent } from './page/marcacao-fraude-principal/marcacao-fraude-principal.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SegurancaModule } from '../seg/seguranca.module';
import { ConsultasFraudesDetalhesComponent } from './consultas-fraudes-detalhes/consultas-fraudes-detalhes.component';
import { MensagemVisualizacaoXmlComponent } from './mensagem-visualizacao-xml/mensagem-visualizacao-xml.component';


@NgModule({
  declarations: [MarcacaoFraudePrincipalComponent, ConsultasFraudesDetalhesComponent, MensagemVisualizacaoXmlComponent],
  imports: [
    CommonModule,
    MarcacaoFraudeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SegurancaModule
  ]
})
export class MarcacaoFraudeModule { }
