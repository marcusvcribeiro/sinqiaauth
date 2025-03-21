import { SegurancaModule } from './../seg/seguranca.module';
import { NgModule } from '@angular/core';
import { ConsultaMensagemComponent } from './page/consulta-mensagem.component';
import { ConsultaMensagemRoutingModule } from './consulta-mensagem-routing.module';
import { ConsultaMensagemService } from './service/consulta-mensagem.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalheConsultaMensagemComponent } from './component/detalhe-consulta-mensagem/detalhe-consulta-mensagem.component';
import { ConsultaTrilhaMensagemComponent } from './component/consulta-trilha-mensagem/consulta-trilha-mensagem.component';
import { BlocoXmlMensagemComponent } from './component/bloco-xml-mensagem/bloco-xml-mensagem.component';

@NgModule({
  imports: [
    SharedModule,
    ConsultaMensagemRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SegurancaModule
  ],
  declarations: [
    ConsultaMensagemComponent,
    DetalheConsultaMensagemComponent,
    BlocoXmlMensagemComponent,
    ConsultaTrilhaMensagemComponent
  ]
})
export class ConsultaMensagemModule { }
