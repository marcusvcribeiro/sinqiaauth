import { MesesDoAnoPipe } from './../shared/pipe/meses-do-ano.pipe';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConciliacaoContabilRoutingModule } from './conciliacao-contabil-routing.module';
import { ConciliacaoContabilComponent } from './page/conciliacao-contabil.component';
import { ConciliacaoContabilService } from './service/conciliacao-contabil.service';
import { ConciliacaoContabilListaAnaliticoComponent } from './component/conciliacao-contabil-lista-analitico/conciliacao-contabil-lista-analitico.component';
import { SegurancaModule } from './../seg/seguranca.module';

@NgModule({
  imports: [
    SharedModule,
    ConciliacaoContabilRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SegurancaModule
  ],
  declarations: [
    ConciliacaoContabilComponent,
    ConciliacaoContabilListaAnaliticoComponent,
  ],
  providers: [
    ConciliacaoContabilService
  ]
})
export class ConciliacaoContabilModule { }
