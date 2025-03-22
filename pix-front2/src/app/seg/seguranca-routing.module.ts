import { HistoricoFuncoesComponent } from './page/historico-funcoes/historico-funcoes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricoLoginComponent } from './page/historico-login/historico-login.component';
import { ModuloSegurancaComponent } from './page/usuarios_grupos/modulo-seguranca.component';

const routes: Routes = [
  {
    path: 'cadastros',
    component: ModuloSegurancaComponent
  },
  {
    path: 'historico-login',
    component: HistoricoLoginComponent
  },
  {
    path: 'historico-funcoes',
    component: HistoricoFuncoesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloSegurancaRoutingModule {

}
