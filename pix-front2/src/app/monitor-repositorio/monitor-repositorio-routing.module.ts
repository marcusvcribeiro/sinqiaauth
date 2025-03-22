import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorRepositorioComponent } from './page/monitor-repositorio.component';

const routes: Routes = [
  {
    path: '',
    component: MonitorRepositorioComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRepositorioRoutingModule {
}
