import { Component, Input } from '@angular/core';
import { LogWebhook } from "src/app/shared/model/log-webhook";

@Component({
  selector: 'app-detalhe-webhook-log-tran',
  templateUrl: './detalhe-webhook-log.component.html',
  styleUrls: ['./detalhe-webhook-log.component.scss']
})
export class DetalheWebhookLogComponent {

  @Input() logWebhook : LogWebhook;

}
