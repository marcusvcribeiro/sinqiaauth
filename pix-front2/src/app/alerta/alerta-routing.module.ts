import { Routes, RouterModule } from '@angular/router';
import { AlertaComponent } from './page/alerta.component';
import { NgModule } from '@angular/core';
import { MensagemDrawerComponent } from './component/mensagem-drawer/mensagem-drawer.component';

const routes: Routes = [
  {
    path: '',
    component: AlertaComponent,
  },
  {
    path: 'mensagem-drawer',
    component: MensagemDrawerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AlertaRoutingModule { }
