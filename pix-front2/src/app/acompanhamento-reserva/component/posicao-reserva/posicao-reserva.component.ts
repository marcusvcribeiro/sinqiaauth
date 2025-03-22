import { DrawerService } from '@albert/ui';
import { Component, Input } from '@angular/core';
import { PosicaoReserva } from '../../../shared/model/posicao-reserva';
import { FormulaCalculadaDrawerComponent } from '../formula-calculada-drawer/formula-calculada-drawer.component';
import { DetalheTransacoesDrawerComponent } from '../detalhe-transacoes-drawer/detalhe-transacoes-drawer.component';

@Component({
  selector: 'app-posicao-reserva',
  templateUrl: './posicao-reserva.component.html',
  styleUrls: ['./posicao-reserva.component.scss']
})
export class PosicaoReservaComponent {

  @Input() posicaoReserva: PosicaoReserva;

  constructor(
    private drawerService: DrawerService
  ) { }

  onClick() {
    this.abrirDrawerDetalheCampo(this.posicaoReserva, this.posicaoReserva.descricao);
  }

  abrirDrawerDetalheCampo(posicaoReserva: PosicaoReserva, headerText: string) {
    if (posicaoReserva.calculado) {
      this.drawerService.create({
        component: FormulaCalculadaDrawerComponent,
        size: 'small',
        componentProps: {
          posicaoReserva
        }
      });
    } else if (posicaoReserva.valor > 0) {
      this.drawerService.create({
        component: DetalheTransacoesDrawerComponent,
        size: 'large',
        componentProps: {
          posicaoReserva, headerText
        }
      });
    }
  }
}
