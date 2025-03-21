import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvisoLiberacaoBloqueioDrawerComponent } from './component/aviso-liberacao-bloqueio-drawer/aviso-liberacao-bloqueio-drawer.component';
import { DesbloqueioTransacaoListaComponent } from './page/desbloqueio-transacao-lista.component';

const routes: Routes = [
  {
    path: 'desbloqueio',
    component: DesbloqueioTransacaoListaComponent
  },
  {
    path: 'aviso-liberacao-bloqueio-drawer',
    component: AvisoLiberacaoBloqueioDrawerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransacaoRoutingModule {
}
