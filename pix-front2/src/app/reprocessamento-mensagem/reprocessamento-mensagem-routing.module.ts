import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReprocessamentoMensagemPageComponent } from './page/reprocessamento-mensagem.component';

const routes: Routes = [
  {
    path: '',
    component: ReprocessamentoMensagemPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReprocessamentoMensagemRoutingModule {
}

