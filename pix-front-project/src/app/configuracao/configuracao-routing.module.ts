import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracaoComponent } from './page/configuracao/configuracao.component';
import { TrocaSenhaComponent } from './page/troca-senha/troca-senha.component';


const routes: Routes = [
  {
    path: '',
    component: ConfiguracaoComponent,
  },
  {
    path: 'troca-senha',
    component: TrocaSenhaComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ConfiguracaoRoutingModule { }
