import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeDocComponent } from './home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeDocComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeDocRoutingModule { }
