import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { BoletagemConsultaService } from 'src/app/boletagem-consulta/service/boletagem.service';
import { TransacaoMensagensRelacionadasFiltro } from 'src/app/shared/model/mensagens-relacionadas';
import { BoletagemAlcadaGestaoReserva } from '../../../../shared/model/alcada-gestao-reserva';

@Component({
  selector: 'app-alcada-gestao-reserva',
  templateUrl: './alcada-gestao-reserva.component.html'
})
export class AlcadaGestaoReservaComponent implements OnInit, OnChanges {
  @ViewChild(Table) pTable: Table;
  @Input() filtro: TransacaoMensagensRelacionadasFiltro;

  rows$: Observable<BoletagemAlcadaGestaoReserva[]>;

  constructor(private boletagemService: BoletagemConsultaService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.listarAlcadaGestaoReserva();
  }

  listarAlcadaGestaoReserva() {
    if (this.filtroCompleto()) {
      this.rows$ = this.boletagemService.listarAlcadaGestaoReserva(this.filtro);
    }
  }

  filtroCompleto() {
    return !!this.filtro
    && !!this.filtro.dataReferencia
    && !!this.filtro.numeroSequenciaTransacao;
  }
}
