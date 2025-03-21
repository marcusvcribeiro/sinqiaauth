import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BoletagemConsultaRoutingModule } from './boletagem-consulta-routing.module';
import { BoletagemListaComponent } from './component/boletagem-listas/boletagem/boletagem-lista.component';
import { BoletagemComponent } from './page/boletagem.component';
import { DefinirPrioridadeComponent } from './component/definir-prioridade/definir-prioridade.component';
import { DetalheMensagemTabsComponent } from './component/detalhe-mensagem/detalhe-mensagem-tabs/detalhe-mensagem-tabs.component';
import { TrilhaTransacaoComponent } from './component/detalhe-mensagem/trilha-transacao/trilha-transacao.component';
import { TrilhaMensagemComponent } from './component/detalhe-mensagem/trilha-mensagem/trilha-mensagem.component';
import { LogOcorrenciaComponent } from './component/detalhe-mensagem/log-ocorrencia/log-ocorrencia.component';
// tslint:disable-next-line
import { TrilhaMensagemTransacaoComponent } from './component/detalhe-mensagem/trilha-mensagem-transacao/trilha-mensagem-transacao.component';
import { TrilhaAlcadaLiberacaoComponent } from './component/detalhe-mensagem/trilha-alcada-liberacao/trilha-alcada-liberacao.component';
import { TrilhaAlcadaReservaComponent } from './component/detalhe-mensagem/trilha-alcada-reserva/trilha-alcada-reserva.component';
import { AlcadaGestaoReservaComponent } from './component/detalhe-mensagem/alcada-gestao-reserva/alcada-gestao-reserva.component';
import { MensagemTransacaoComponent } from './component/detalhe-mensagem/mensagens-transacao/mensagens-transacao.component';
import { MensagemRelacionadaComponent } from './component/detalhe-mensagem/mensagens-relacionadas/mensagens-relacionadas.component';
import { BoletoModule } from '../boleto/boleto.module';
import { BoletagemRefreshOptionsComponent } from './component/boletagem-refresh-options/boletagem-refresh-options.component';
import { SegurancaModule } from '../seg/seguranca.module';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { DetalheLogWebhookComponent } from './component/detalhe-mensagem/detalhe-log-webhook/detalhe-log-webhook.component';
import { DetalheWebhookLogComponent } from './component/detalhe-mensagem/detalhe-webhook-log/detalhe-webhook-log.component';


@NgModule({
  declarations: [
    BoletagemComponent,
    DefinirPrioridadeComponent,
    BoletagemComponent,
    BoletagemListaComponent,
    DetalheMensagemTabsComponent,
    TrilhaTransacaoComponent,
    TrilhaMensagemComponent,
    LogOcorrenciaComponent,
    TrilhaMensagemTransacaoComponent,
    TrilhaAlcadaLiberacaoComponent,
    TrilhaAlcadaReservaComponent,
    AlcadaGestaoReservaComponent,
    MensagemTransacaoComponent,
    MensagemRelacionadaComponent,
    BoletagemRefreshOptionsComponent,
    DetalheLogWebhookComponent,
    DetalheWebhookLogComponent
  ],
  imports: [
    BoletagemConsultaRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BoletoModule,
    SegurancaModule,
    KeyboardShortcutsModule
  ]
})
export class BoletagemConsultaModule { }
