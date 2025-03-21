import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Alerta } from 'src/app/shared/model/alerta';
import { AlertaService } from 'src/app/shared/service/alerta.service';

@Component({
  selector: 'app-mensagem-drawer',
  templateUrl: './mensagem-drawer.component.html',
  styleUrls: ['./mensagem-drawer.component.scss']
})
export class MensagemDrawerComponent implements OnInit {
  @Output() drawerClose = new EventEmitter();
  @Input() alerta: Alerta;

  constructor(
    private alertaService: AlertaService
  ) {}

  ngOnInit() {
    this.corrigirUrls();
    this.alertaService.listarMarcarLido(this.alerta).subscribe(v => this.drawerClose.emit());
  }

  private corrigirUrls() {
    // TODO -> Tratar SVG melhor....
    if (this.alerta.descricaoMensagem) {
      this.alerta.descricaoMensagem = this.alerta.descricaoMensagem
        .replace(/<img.*src=".*logo_consult\.jpg.*<\/img>/g,
          `<img src="assets/fav/sinqia.svg"  style="height:  style="height: 20px"></img>`)
        .replace(/<img.*src=".*logo_spb\.gif.*<\/img>/g,
          `<img src="assets/fav/quadrados.svg"  style="height:  style="height: 20px"></img>`);
    }
  }
}
