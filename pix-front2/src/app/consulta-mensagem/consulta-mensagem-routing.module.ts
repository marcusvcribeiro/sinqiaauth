import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsultaMensagemComponent } from './page/consulta-mensagem.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultaMensagemComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaMensagemRoutingModule {
}
