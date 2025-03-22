import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AcompanhamentoReservaWidgetComponent } from './component/acompanhamento-reserva-widget/acompanhamento-reserva-widget.component';
import { CamposReservaComponent } from './component/campos-reserva/campos-reserva.component';
import { DetalheTransacoesDrawerComponent } from './component/detalhe-transacoes-drawer/detalhe-transacoes-drawer.component';
import { FormulaCalculadaDrawerComponent } from './component/formula-calculada-drawer/formula-calculada-drawer.component';
import { PosicaoReservaComponent } from './component/posicao-reserva/posicao-reserva.component';

@NgModule({
  declarations: [
    AcompanhamentoReservaWidgetComponent,
    CamposReservaComponent,
    PosicaoReservaComponent,
    DetalheTransacoesDrawerComponent,
    FormulaCalculadaDrawerComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class AcompanhamentoReservaModule { }
