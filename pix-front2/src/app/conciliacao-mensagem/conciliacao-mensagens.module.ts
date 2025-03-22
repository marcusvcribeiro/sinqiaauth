import { SegurancaModule } from './../seg/seguranca.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ConciliacaoMensagensRoutingModule } from './conciliacao-mensagens-routing.module';
import { ConciliacaoMensagensComponent } from './page/conciliacao-mensagens.component';
import {
  ConciliacaoMensagensTarifadasComponent
} from './component/conciliacao-mensagens-tarifadas/conciliacao-mensagens-tarifadas.component';
import { ParametrosGlobaisService } from '../shared/service/parametros-globais.service';
import { ConciliacaoMensagemService } from './service/conciliacao-mensagem.service';
import { TreeTableModule } from 'primeng/treetable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    SharedModule,
    ConciliacaoMensagensRoutingModule,
    TreeTableModule,
    FormsModule,
    ReactiveFormsModule,
    SegurancaModule
  ],
  declarations: [
    ConciliacaoMensagensComponent,
    ConciliacaoMensagensTarifadasComponent
  ],
  providers: [
    ParametrosGlobaisService,
    ConciliacaoMensagemService
  ]
})
export class ConciliacaoMensagensModule { }
