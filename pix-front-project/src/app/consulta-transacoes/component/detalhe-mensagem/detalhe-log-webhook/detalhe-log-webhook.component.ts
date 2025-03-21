import { DrawerService } from "@albert/ui";
import { Observable } from 'rxjs';
import { Table } from 'primeng/table';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { LogWebhook } from "src/app/shared/model/log-webhook";
import { TransacaoMensagensRelacionadasFiltro } from 'src/app/shared/model/mensagens-relacionadas';
import { ConsultaTransacaoManualService } from 'src/app/consulta-transacoes/service/consulta-transacao-manual.service';
import { DetalheWebhookLogComponent } from "../detalhe-webhook-log/detalhe-webhook-log.component";
import { TipoAlerta } from 'src/app/shared/model/enum/tipo-alerta';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-detalhe-log-webhook-tran",
  templateUrl: "./detalhe-log-webhook.component.html",
  styleUrls: ["./detalhe-log-webhook.component.scss"],
})
export class DetalheLogWebhookComponent implements OnInit, OnChanges {
  @Input() filtro: TransacaoMensagensRelacionadasFiltro;
  @ViewChild(Table) pTable: Table;
  rows:  Observable<LogWebhook[]>;
  tipoAlerta = TipoAlerta;
  selected: LogWebhook;

  constructor(
    private boletagemService: ConsultaTransacaoManualService,
    private drawerService: DrawerService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.loadTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadTable();
  }

  loadTable() {
    if (this.filtroCompleto()) {
      this.rows = this.boletagemService.listLogWebhook(this.filtro);
    }
  }

  filtroCompleto() {
    return !!this.filtro
      && !!this.filtro.dataReferencia
      && !!this.filtro.numeroSequenciaTransacao;
  }

  async onDetalhe(log: LogWebhook) {
    this.selected = log;
    const { drawerComponent } = await this.drawerService.create({
      component: DetalheWebhookLogComponent,
      size: 'medium',
      componentProps: { logWebhook: log },
      title: this.translateService.instant('titulo.logWebhook'),
    });
    drawerComponent.instance.close.subscribe(() => {
      this.selected = null;
    });
  }
}
