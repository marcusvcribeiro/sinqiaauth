import { SegurancaModule } from './../seg/seguranca.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultaCobrancaComponent } from './page/consulta-cobranca/consulta-cobranca.component';
import { DetalheVencimentoComponent } from './component/detalhe-vencimento/detalhe-vencimento.component';
import { DetalheImediataComponent } from './component/detalhe-imediata/detalhe-imediata.component';
import { ConsultaCobrancaRoutingModule } from './consulta-cobranca-routing.module';
import { DetalheConsultaCobrancaComponent } from './component/detalhe-consulta-cobranca/detalhe-consulta-cobranca.component';
import { DetalheLogOcorrenciaComponent } from './component/detalhe-log-ocorrencia/detalhe-log-ocorrencia.component';
import { DetalheInfoAdicionaisComponent } from './component/detalhe-info-adicionais/detalhe-info-adicionais.component';
import { DetalheDescDataFixaComponent } from './component/detalhe-desc-data-fixa/detalhe-desc-data-fixa.component';
import { DetalheOcorrenciaLogComponent } from './component/detalhe-ocorrencia-log/detalhe-ocorrencia-log.component';
import { DetalheCopiaColaComponent } from './component/detalhe-copia-cola/detalhe-copia-cola.component';
import { DetalheLogWebhookComponent } from './component/detalhe-log-webhook/detalhe-log-webhook.component';
import { DetalheWebhookLogComponent } from './component/detalhe-webhook-log/detalhe-webhook-log.component';


@NgModule({
  imports: [
    SharedModule,
    ConsultaCobrancaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SegurancaModule
  ],
  declarations: [
    ConsultaCobrancaComponent,
    DetalheVencimentoComponent,
    DetalheImediataComponent,
    DetalheConsultaCobrancaComponent,
    DetalheLogOcorrenciaComponent,
    DetalheInfoAdicionaisComponent,
    DetalheDescDataFixaComponent,
    DetalheOcorrenciaLogComponent,
    DetalheCopiaColaComponent,
    DetalheLogWebhookComponent,
    DetalheWebhookLogComponent
  ]
})
export class ConsultaCobrancaModule { }
