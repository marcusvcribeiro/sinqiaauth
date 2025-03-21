import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PixRecebidoNaoCreditadoComponent } from './page/pix-recebido-nao-creditado.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {
         path: '',
         component: PixRecebidoNaoCreditadoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PixRecebidoNaoCreditadoRoutingModule {
}
