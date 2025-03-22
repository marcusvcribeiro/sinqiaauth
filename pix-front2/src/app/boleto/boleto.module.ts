import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BoletoCampoComponent } from './component/edicao/boleto-campo/boleto-campo.component';
import { BoletoComposicaoComponent } from './component/edicao/boleto-composicao/boleto-composicao.component';
import { BoletoGrupoRepeticaoComponent } from './component/edicao/boleto-grupo-repeticao/boleto-grupo-repeticao.component';
import { BoletoGrupoComponent } from './component/edicao/boleto-grupo/boleto-grupo.component';
import { BoletoComponent } from './component/edicao/boleto/boleto.component';
import { BoletoVisualizacaoXmlComponent } from './component/visualizacao/boleto-visualizacao-xml/boleto-visualizacao-xml.component';
import { BoletoVisualizacaoComponent } from './component/visualizacao/boleto-visualizacao/boleto-visualizacao.component';
import { GrupoVisualizacaoComponent } from './component/visualizacao/grupo-visualizacao/grupo-visualizacao.component';
import { MensagemTransacaoComponent } from './component/visualizacao/mensagem-transacao/mensagem-transacao.component';
import { BoletagemScrollSpyItemDirective } from './directive/boletagem-scroll-spy-item.directive';
import { BoletoSidenavService } from './service/boletagem-sidenav.service';

@NgModule({
  declarations: [
    BoletoVisualizacaoComponent,
    BoletoComponent,
    GrupoVisualizacaoComponent,
    BoletoCampoComponent,
    BoletagemScrollSpyItemDirective,
    BoletoComposicaoComponent,
    BoletoGrupoComponent,
    BoletoGrupoRepeticaoComponent,
    BoletoVisualizacaoXmlComponent,
    MensagemTransacaoComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BoletoSidenavService
  ]
})
export class BoletoModule { }
