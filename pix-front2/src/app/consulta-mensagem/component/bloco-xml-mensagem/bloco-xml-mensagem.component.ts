import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bloco-xml-mensagem',
  templateUrl: './bloco-xml-mensagem.component.html',
  styleUrls: ['./bloco-xml-mensagem.component.scss']
})
export class BlocoXmlMensagemComponent {

  @Input() xml: string;

}
