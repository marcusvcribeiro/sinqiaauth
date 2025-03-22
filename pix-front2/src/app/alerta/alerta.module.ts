import { SegurancaModule } from './../seg/seguranca.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AlertaRoutingModule } from './alerta-routing.module';
import { MensagemDrawerComponent } from './component/mensagem-drawer/mensagem-drawer.component';
import { AlertaComponent } from './page/alerta.component';

@NgModule({
  declarations: [
    AlertaComponent,
    MensagemDrawerComponent
  ],
  imports: [
    AlertaRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SegurancaModule
  ],
})

export class AlertaModule { }
