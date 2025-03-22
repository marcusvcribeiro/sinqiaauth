import { SegurancaModule } from './../seg/seguranca.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardRefreshOptionsComponent } from './component/dashboard-refresh-options/dashboard-refresh-options.component';
import { DashboardRefreshComponent } from './component/dashboard-refresh/dashboard-refresh.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './page/dashboard-page.component';
import { AcompanhamentoReservaModule } from '../acompanhamento-reserva/acompanhamento-reserva.module';
import { DashboardSolicitaSaqueComponent } from './component/dashboard-solicita-saque/dashboard-solicita-saque.component';
import { DashboardSolicitaDepositoComponent } from './component/dashboard-solicita-deposito/dashboard-solicita-deposito.component';


@NgModule({
  imports: [
    DashboardRoutingModule,
    SharedModule,
    AcompanhamentoReservaModule,
    FormsModule,
    ReactiveFormsModule,
    SegurancaModule
  ],
  declarations: [
    DashboardPageComponent,
    DashboardRefreshComponent,
    DashboardRefreshOptionsComponent,
    DashboardSolicitaSaqueComponent,
    DashboardSolicitaDepositoComponent
  ],
})
export class AppDashboardModule { }
