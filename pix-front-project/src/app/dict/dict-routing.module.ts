import { Routes, RouterModule } from '@angular/router';
import { ChaveDictPageComponent } from './page/chave/chave-dict-page.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'chave',
    component: ChaveDictPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DictRoutingModule { }
