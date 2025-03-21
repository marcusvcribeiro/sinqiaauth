import { LogOcorrencia } from './../../../shared/model/log-ocorrencia';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-log-ocorrencia-visualizacao',
  templateUrl: './log-ocorrencia-visualizacao.component.html',
  styleUrls: ['./log-ocorrencia-visualizacao.component.scss']
})
export class LogOcorrenciaVisualizacaoComponent {

  @Input() logOcorrencia: LogOcorrencia;
}
