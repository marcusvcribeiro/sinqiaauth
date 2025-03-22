import { NgModule } from '@angular/core';
import { ConfiguracaoRoutingModule } from './configuracao-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfiguracaoComponent } from './page/configuracao/configuracao.component';
import { TrocaSenhaComponent } from './page/troca-senha/troca-senha.component';
import { ParametrosGeraisComponent } from './component/parametros-gerais/parametros-gerais.component';
import { SegurancaModule } from '../seg/seguranca.module';
import { ParametroTransacaoagendadaComponent } from './component/parametro-transacaoagendada/parametro-transacaoagendada/parametro-transacaoagendada.component';
import { ParametroFormTransacaoagendadaComponent } from './component/parametro-transacaoagendada/parametro-form-transacaoagendada/parametro-form-transacaoagendada.component';
import { CertificadoDigitalContatoComponent } from './component/certificado-digital-contato/certificado-digital-contato.component';

@NgModule({
  declarations: [
    ConfiguracaoComponent,
    TrocaSenhaComponent,
    ParametrosGeraisComponent,
    ParametroTransacaoagendadaComponent,
    ParametroFormTransacaoagendadaComponent,
    CertificadoDigitalContatoComponent
  ],
  imports: [
    SharedModule,
    ConfiguracaoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SegurancaModule
  ]
})
export class ConfiguracaoModule { }
