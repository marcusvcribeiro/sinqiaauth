import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarcacaoFraudePrincipalComponent } from './page/marcacao-fraude-principal/marcacao-fraude-principal.component';


const routes: Routes = [
  {
    path: '',
    component: MarcacaoFraudePrincipalComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcacaoFraudeRoutingModule { }
