import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConciliacaoContabilComponent } from './page/conciliacao-contabil.component';

const routes: Routes = [
  {
    path: '',
    component: ConciliacaoContabilComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConciliacaoContabilRoutingModule {
}
