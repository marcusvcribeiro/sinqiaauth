import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsultaLogOcorrenciaComponent } from './page/consulta-log-ocorrencia.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
         path: '',
         component: ConsultaLogOcorrenciaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaLogOcorrenciaRoutingModule {
}
