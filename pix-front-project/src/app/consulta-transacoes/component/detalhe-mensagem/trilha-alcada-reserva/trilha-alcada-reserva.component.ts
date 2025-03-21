import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { ConsultaTransacaoManualService } from 'src/app/consulta-transacoes/service/consulta-transacao-manual.service';
import { TransacaoMensagensRelacionadasFiltro } from 'src/app/shared/model/mensagens-relacionadas';
import { BoletagemTrilhaAlcadaReserva } from '../../../../shared/model/trilha-alcada-reserva';

@Component({
  selector: 'app-trilha-alcada-reserva-tran',
  templateUrl: './trilha-alcada-reserva.component.html'
})
export class TrilhaAlcadaReservaComponent implements OnChanges {
  @ViewChild(Table) pTable: Table;
  @Input() filtro: TransacaoMensagensRelacionadasFiltro;

  rows: Observable<BoletagemTrilhaAlcadaReserva[]>;

  constructor(private boletagemService: ConsultaTransacaoManualService) { }

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
