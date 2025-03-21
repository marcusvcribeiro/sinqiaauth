import { MesesDoAnoPipe } from '../shared/pipe/meses-do-ano.pipe';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemposAnsRoutingModule } from './tempos-ans-routing.module';
import { TemposAnsComponent } from './page/tempos-ans.component';
import { TemposAnsService } from './service/tempos-ans.service';
import { TemposAnsListaAnaliticoComponent } from './component/tempos-ans-lista-analitico/tempos-ans-lista-analitico.component';
import { SegurancaModule } from '../seg/seguranca.module';

@NgModule({
  imports: [
    SharedModule,
    TemposAnsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SegurancaModule
  ],
  declarations: [
    TemposAnsComponent,
    TemposAnsListaAnaliticoComponent,
  ],
  providers: [
    TemposAnsService
  ]
})
export class TemposAnsModule { }
