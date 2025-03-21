import { Component, Input, OnInit } from '@angular/core';
import { FormulaCalculada } from '../../../shared/model/formula-calculada';
import { PosicaoReserva } from '../../../shared/model/posicao-reserva';
import { AcompanhamentoReservaService } from '../../service/acompanhamento-reserva.service';


@Component({
  selector: 'app-formula-calculada-drawer',
  templateUrl: './formula-calculada-drawer.component.html',
  styleUrls: ['./formula-calculada-drawer.component.scss'],
})
export class FormulaCalculadaDrawerComponent implements OnInit {
  @Input() posicaoReserva: PosicaoReserva;
  formulaCampo: FormulaCalculada = new FormulaCalculada();

  constructor(private acompanhamentoReservaService: AcompanhamentoReservaService) {
  }

  ngOnInit() {
    this.obterFormulaCampo();
  }

  obterFormulaCampo() {
    this.acompanhamentoReservaService.obterFormulaCampo(this.posicaoReserva.campo)
      .subscribe(data => {
        this.formulaCampo.descricao = this.posicaoReserva.descricao;
        this.formulaCampo.formula = data.formula;
        this.formulaCampo.valor = this.posicaoReserva.valor;
      });
  }
}
