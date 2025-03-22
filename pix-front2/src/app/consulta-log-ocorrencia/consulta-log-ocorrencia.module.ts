import { SegurancaModule } from './../seg/seguranca.module';
import { NgModule } from '@angular/core';
import { ConsultaLogOcorrenciaComponent } from './page/consulta-log-ocorrencia.component';
import { ConsultaLogOcorrenciaRoutingModule } from './consulta-log-ocorrencia-routing.module';
import { ConsultaLogOcorrenciaListComponent } from './component/consulta-log-ocorrencia-list/consulta-log-ocorrencia-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogOcorrenciaVisualizacaoComponent } from './component/log-ocorrencia-visualizacao/log-ocorrencia-visualizacao.component';

@NgModule({
  imports: [
    SharedModule,
    ConsultaLogOcorrenciaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SegurancaModule
  ],
  declarations: [
    ConsultaLogOcorrenciaComponent,
    ConsultaLogOcorrenciaListComponent,
    LogOcorrenciaVisualizacaoComponent
  ],
})
export class ConsultaLogOcorrenciaModule { }
