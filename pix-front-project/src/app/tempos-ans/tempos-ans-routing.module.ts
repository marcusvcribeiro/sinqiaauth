import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemposAnsComponent } from './page/tempos-ans.component';

const routes: Routes = [
  {
    path: '',
    component: TemposAnsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemposAnsRoutingModule {
}
