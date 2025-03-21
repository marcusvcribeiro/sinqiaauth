import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaCobrancaComponent } from './page/consulta-cobranca/consulta-cobranca.component';


const routes: Routes = [
  {
    path: '',
    component: ConsultaCobrancaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaCobrancaRoutingModule {
}
