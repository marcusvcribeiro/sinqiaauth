import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoletagemComponent } from './page/boletagem.component';

const routes: Routes = [
  {
    path: '',
    component: BoletagemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoletagemConsultaRoutingModule {
}
