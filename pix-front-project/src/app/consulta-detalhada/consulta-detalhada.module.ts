import { ConsultaCampoFiltroComponent } from './component/consulta-campo-filtro/consulta-campo-filtro.component';
import { ConsultaDetalhadaMensagemComponent } from './component/consulta-detalhada-mensagem/consulta-detalhada-mensagem.component';
import { ConsultaDetalhadaComponent } from './page/consulta-detalhada.component';
import { ConsultaDetalhadaRoutingModule } from './consulta-detalhada-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SegurancaModule } from '../seg/seguranca.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ConsultaDetalhadaRoutingModule,
    SegurancaModule
  ],
  declarations: [
    ConsultaDetalhadaComponent,
    ConsultaDetalhadaMensagemComponent,
    ConsultaCampoFiltroComponent
  ],
})
export class ConsultaDetalhadaModule { }
