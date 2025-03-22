import { DrawerService } from "@albert/ui";
import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { CobLogWebhook } from "src/app/shared/model/cob-log-webhook";
import { ConsultaCobranca } from "src/app/shared/model/consulta-cobranca";
import { ConsultaCobrancaService } from "../../service/consulta-cobranca.service";
import { DetalheWebhookLogComponent } from "../detalhe-webhook-log/detalhe-webhook-log.component";
import { TipoAlerta } from 'src/app/shared/model/enum/tipo-alerta';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-detalhe-log-webhook",
  templateUrl: "./detalhe-log-webhook.component.html",
  styleUrls: ["./detalhe-log-webhook.component.scss"],
})
export class DetalheLogWebhookComponent implements OnInit {
  @Input() cobranca: ConsultaCobranca;
  data: CobLogWebhook[] = [];
  tipoAlerta = TipoAlerta;
  selected: CobLogWebhook;

  constructor(
    private consultaCobrancaService: ConsultaCobrancaService,
    private cdr: ChangeDetectorRef,
    private drawerService: DrawerService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.loadTable();
  }

  loadTable() {
    this.consultaCobrancaService.listLogWebhookQrCode(this.cobranca).subscribe((data) => {
        this.data = data;
      });
    this.cdr.detectChanges();
  }

  async onDetalhe(log: CobLogWebhook) {
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
