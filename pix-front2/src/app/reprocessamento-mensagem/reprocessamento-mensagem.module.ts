import { SegurancaModule } from './../seg/seguranca.module';
import { NgModule } from '@angular/core';
import { ReprocessamentoMensagemRoutingModule } from './reprocessamento-mensagem-routing.module';
import { ReprocessamentoMensagemPageComponent } from './page/reprocessamento-mensagem.component';
import { ReprocessamentoMensagemService } from './service/reprocessamento-mensagem.service';
import { SharedModule } from '../shared/shared.module';
import { ReprocessamentoEnvioComponent } from './component/reprocessamento-envio/reprocessamento-envio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReprocessamentoEnvioRepositorioSaidaComponent } from './component/reprocessamento-envio-repositorio-saida/reprocessamento-envio-repositorio-saida.component';
import { ReprocessamentoFormatacaoComponent } from './component/reprocessamento-formatacao/reprocessamento-formatacao.component';
import { ReprocessamentoRecebimentoComponent } from './component/reprocessamento-recebimento/reprocessamento-recebimento.component';
import { ReprocessamentoRepositorioEntradaComponent } from './component/reprocessamento-repositorio-entrada/reprocessamento-repositorio-entrada.component';
import { ReprocessamentoRepositorioSaidaComponent } from './component/reprocessamento-repositorio-saida/reprocessamento-repositorio-saida.component';
import { MensagemVisualizacaoXmlComponent } from './component/visualizacao/mensagem-visualizacao-xml/mensagem-visualizacao-xml.component';


@NgModule({
  imports: [
    SharedModule,
    ReprocessamentoMensagemRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SegurancaModule
  ],
  declarations: [
    ReprocessamentoMensagemPageComponent,
    ReprocessamentoEnvioComponent,
    ReprocessamentoEnvioRepositorioSaidaComponent,
    ReprocessamentoFormatacaoComponent,
    ReprocessamentoRecebimentoComponent,
    ReprocessamentoRepositorioEntradaComponent,
    ReprocessamentoRepositorioSaidaComponent,
    MensagemVisualizacaoXmlComponent
  ],
  providers: [
    ReprocessamentoMensagemService
  ]
})
export class ReprocessamentoMensagemModule { }
