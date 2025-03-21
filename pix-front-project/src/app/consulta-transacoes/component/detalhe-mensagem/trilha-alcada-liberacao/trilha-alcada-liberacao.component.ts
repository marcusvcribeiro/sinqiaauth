import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { ConsultaTransacaoManualService } from 'src/app/consulta-transacoes/service/consulta-transacao-manual.service';
import { TransacaoMensagensRelacionadasFiltro } from 'src/app/shared/model/mensagens-relacionadas';
import { BoletagemTrilhaAlcadaLiberacao } from 'src/app/shared/model/trilha-alcada-liberacao';

@Component({
  selector: 'app-trilha-alcada-liberacao-tran',
  templateUrl: './trilha-alcada-liberacao.component.html'
})
export class TrilhaAlcadaLiberacaoComponent implements OnInit, OnChanges {
  @ViewChild(Table) pTable: Table;
  @Input() filtro: TransacaoMensagensRelacionadasFiltro;

  rows: Observable<BoletagemTrilhaAlcadaLiberacao[]>;

  constructor(private boletagemService: ConsultaTransacaoManualService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.listarTrilhaAlcadaLiberacao();
  }

  listarTrilhaAlcadaLiberacao() {
    if (this.filtroCompleto()) {
      this.rows = this.boletagemService.listarTrilhaAlcadaLiberacao(this.filtro);
    }
  }

  filtroCompleto() {
    return !!this.filtro
      && !!this.filtro.dataReferencia
      && !!this.filtro.numeroSequenciaTransacao;
  }
}
