import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { ConsultaTransacaoManualService } from 'src/app/consulta-transacoes/service/consulta-transacao-manual.service';
import { LogOcorrenciaVisualizacaoComponent } from 'src/app/consulta-log-ocorrencia/component/log-ocorrencia-visualizacao/log-ocorrencia-visualizacao.component';
import { LogOcorrencia } from 'src/app/shared/model/log-ocorrencia';
import { TransacaoMensagensRelacionadasFiltro } from 'src/app/shared/model/mensagens-relacionadas';
import { DrawerService } from '@albert/ui';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-log-ocorrencia-tran',
  templateUrl: './log-ocorrencia.component.html'
})
export class LogOcorrenciaComponent implements OnInit, OnChanges {
  @ViewChild(Table) pTable: Table;
  @Input() filtro: TransacaoMensagensRelacionadasFiltro;

  rows: Observable<LogOcorrencia[]>;

  constructor(private boletagemService: ConsultaTransacaoManualService,
     private drawerService: DrawerService,
     private translateService: TranslateService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.listarLogOcorrencia();
  }

  listarLogOcorrencia() {
    if (this.filtroCompleto()) {
      this.rows = this.boletagemService.listarLogOcorrencia(this.filtro);
    }
  }

  filtroCompleto() {
    return !!this.filtro
      && !!this.filtro.dataReferencia
      && !!this.filtro.numeroSequenciaTransacao;
  }

  onVisualizarOcorrencia(logOcorrencia: LogOcorrencia) {
    this.drawerService.create({
      component: LogOcorrenciaVisualizacaoComponent,
      size: 'medium',
      componentProps: { logOcorrencia },
      title: this.translateService.instant('titulo.logOcorrencia')
    });
  }
}
