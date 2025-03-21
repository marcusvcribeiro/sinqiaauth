import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApuracaoDadosInformesBacenComponent } from './page/apuracao-dados-informes-bacen.component';

const routes: Routes = [
  {
    path: '',
    component: ApuracaoDadosInformesBacenComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApuracaoDadosInformesBacenRoutingModule {
}
