import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { BoletagemConsultaService } from 'src/app/boletagem-consulta/service/boletagem.service';
import { TransacaoMensagensRelacionadasFiltro } from 'src/app/shared/model/mensagens-relacionadas';
import { BoletagemTrilhaAlcadaReserva } from '../../../../shared/model/trilha-alcada-reserva';

@Component({
  selector: 'app-trilha-alcada-reserva',
  templateUrl: './trilha-alcada-reserva.component.html'
})
export class TrilhaAlcadaReservaComponent implements OnChanges {
  @ViewChild(Table) pTable: Table;
  @Input() filtro: TransacaoMensagensRelacionadasFiltro;

  rows: Observable<BoletagemTrilhaAlcadaReserva[]>;

  constructor(private boletagemService: BoletagemConsultaService) { }

  ngOnChanges() {
    this.listarTrilhaAlcadaReserva();
  }

  listarTrilhaAlcadaReserva() {
    if (this.filtroCompleto()) {
      this.rows = this.boletagemService.listarTrilhaAlcadaReserva(this.filtro);
    }
  }

  filtroCompleto() {
    return !!this.filtro
      && !!this.filtro.dataReferencia
      && !!this.filtro.numeroSequenciaTransacao;
  }
}
