import { SegurancaModule } from './../seg/seguranca.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DetalheDictTabsComponent } from './component/detalhe-dict/detalhe-dict-tabs/detalhe-dict-tabs.component';
import { DictRoutingModule } from './dict-routing.module';
import { ChaveDictPageComponent } from './page/chave/chave-dict-page.component';
import { EditarDictComponent } from './component/editar-dict/editar-dict.component';
import { HistoricoDictComponent } from './component/detalhe-dict/historico-dict/historico-dict.component';
import { TrilhaSituacaoRegistroChaveDictComponent } from './component/detalhe-dict/trilha-situacao-registro-chave-dict/trilha-situacao-registro-chave-dict.component';

@NgModule({
  declarations: [
    ChaveDictPageComponent,
    DetalheDictTabsComponent,
    EditarDictComponent,
    HistoricoDictComponent,
    TrilhaSituacaoRegistroChaveDictComponent
  ],
  imports: [
    DictRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SegurancaModule
  ],
})

export class DictModule { }
