import { SegurancaModule } from './../seg/seguranca.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PixRecebidoNaoCreditadoRoutingModule } from './pix-recebido-nao-creditado-routing.module';
import { PixRecebidoNaoCreditadoComponent } from './page/pix-recebido-nao-creditado.component';
import { DetalhePixNaoCreditadoComponent } from './component/detalhe-pix-nao-creditado/detalhe-pix-nao-creditado.component';
import { DetalheMensagemTransacaoComponent } from './component/detalhe-mensagem-transacao/detalhe-mensagem-transacao.component';
import { DetalheLogOrquestradorComponent } from './component/detalhe-log-orquestrador/detalhe-log-orquestrador.component';
import { DetalheOrquestradorLogComponent } from './component/detalhe-orquestrador-log/detalhe-orquestrador-log.component';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';

@NgModule({
  imports: [
    SharedModule,
    PixRecebidoNaoCreditadoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SegurancaModule,
    KeyboardShortcutsModule
  ],
  declarations: [
    PixRecebidoNaoCreditadoComponent,
    DetalhePixNaoCreditadoComponent,
    DetalheMensagemTransacaoComponent,
    DetalheLogOrquestradorComponent,
    DetalheOrquestradorLogComponent
  ],
})
export class PixRecebidoNaoCreditadoModule { }
