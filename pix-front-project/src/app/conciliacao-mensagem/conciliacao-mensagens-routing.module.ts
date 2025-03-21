import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConciliacaoMensagensComponent } from './page/conciliacao-mensagens.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ConciliacaoMensagensComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConciliacaoMensagensRoutingModule {
}
