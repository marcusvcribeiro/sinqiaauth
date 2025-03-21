import { Component, Input } from '@angular/core';
import { ConsultaMensagem } from 'src/app/shared/model/consulta-mensagem';
@Component({
  selector: 'app-detalhe-consulta-mensagem',
  templateUrl: './detalhe-consulta-mensagem.component.html',
  styleUrls: ['./detalhe-consulta-mensagem.component.scss']
})
export class DetalheConsultaMensagemComponent {

  @Input() mensagem: ConsultaMensagem;

}
