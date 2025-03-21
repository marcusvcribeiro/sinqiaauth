import { Component, Input } from '@angular/core';
import { TransacaoErro } from 'src/app/shared/model/transacao-erro';

@Component({
  selector: 'app-aviso-liberacao-bloqueio-drawer',
  templateUrl: './aviso-liberacao-bloqueio-drawer.component.html'
})
export class AvisoLiberacaoBloqueioDrawerComponent {
  @Input() transacoes: TransacaoErro[];

  constructor() {
  }
}
