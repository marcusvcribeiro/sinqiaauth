import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoxSpaceDocComponent } from './pages/box-space/box-space.component';
import { ButtonGroupDocComponent } from './pages/button-group/button-group.component';
import { DivisorDocComponent } from './pages/divisor/divisor.component';
import { IconDocComponent } from './pages/icon/icon.component';
import { VariablesDocComponent } from './pages/variables/variables.component';

const routes: Routes = [
  {
    path: 'box-space',
    component: BoxSpaceDocComponent,
  },
  {
    path: 'button-group',
    component: ButtonGroupDocComponent,
  },
  {
    path: 'divisor',
    component: DivisorDocComponent,
  },
  {
    path: 'icon',
    component: IconDocComponent,
  },
  {
    path: 'variables',
    component: VariablesDocComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StylesRoutingModule { }
