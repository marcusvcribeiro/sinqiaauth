import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsultaDetalhadaComponent } from './page/consulta-detalhada.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
         path: '',
         component: ConsultaDetalhadaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaDetalhadaRoutingModule {
}
