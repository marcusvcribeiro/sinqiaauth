import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ConsultaTransacoesRoutingModule } from './consulta-transacoes-routing.module';
import { BoletoModule } from '../boleto/boleto.module';
import { SegurancaModule } from '../seg/seguranca.module';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { ConsultaTransacoesComponent } from './component/consulta-transacoes-listas/consulta-transacoes/consulta-transacoes-lista.component';
import { TransacoesComponent } from './page/transacoes.component';
import { DetalheMensagemTabsComponent } from './component/detalhe-mensagem/detalhe-mensagem-tabs/detalhe-mensagem-tabs.component';
import { TrilhaTransacaoComponent } from './component/detalhe-mensagem/trilha-transacao/trilha-transacao.component';
import { TrilhaMensagemComponent } from './component/detalhe-mensagem/trilha-mensagem/trilha-mensagem.component';
import { LogOcorrenciaComponent } from './component/detalhe-mensagem/log-ocorrencia/log-ocorrencia.component';
import { TrilhaMensagemTransacaoComponent } from './component/detalhe-mensagem/trilha-mensagem-transacao/trilha-mensagem-transacao.component';
import { TrilhaAlcadaLiberacaoComponent } from './component/detalhe-mensagem/trilha-alcada-liberacao/trilha-alcada-liberacao.component';
import { TrilhaAlcadaReservaComponent } from './component/detalhe-mensagem/trilha-alcada-reserva/trilha-alcada-reserva.component';
import { AlcadaGestaoReservaComponent } from './component/detalhe-mensagem/alcada-gestao-reserva/alcada-gestao-reserva.component';
import { MensagemTransacaoComponent } from './component/detalhe-mensagem/mensagens-transacao/mensagens-transacao.component';
import { MensagemRelacionadaComponent } from './component/detalhe-mensagem/mensagens-relacionadas/mensagens-relacionadas.component';
import { DetalheLogWebhookComponent } from './component/detalhe-mensagem/detalhe-log-webhook/detalhe-log-webhook.component';
import { DetalheWebhookLogComponent } from './component/detalhe-mensagem/detalhe-webhook-log/detalhe-webhook-log.component';


@NgModule({
  declarations: [
    ConsultaTransacoesComponent,
    TransacoesComponent,
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
    DetalheLogWebhookComponent,
    DetalheWebhookLogComponent
      ],
  imports: [
    ConsultaTransacoesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BoletoModule,
    SegurancaModule,
    KeyboardShortcutsModule
  ]
})
export class TransacoesConsultaModule { }
