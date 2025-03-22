import { Component, Input, OnInit } from '@angular/core';
import { MonitorRepositorioService } from '../../service/monitor-repositorio.service';
import { MensagemRepositorioSaida } from 'src/app/shared/model/mensagem-repositorio-saida';
import { DrawerService } from '@albert/ui';
import { LogOcorrencia } from 'src/app/shared/model/log-ocorrencia';
import { LogOcorrenciaVisualizacaoComponent } from 'src/app/consulta-log-ocorrencia/component/log-ocorrencia-visualizacao/log-ocorrencia-visualizacao.component';

@Component({
  selector: 'app-repositorio-saida',
  templateUrl: './repositorio-saida.component.html',
})
export class RepositorioSaidaComponent implements OnInit {

  constructor(
    private monitorRepositorioService: MonitorRepositorioService,
    private drawerService: DrawerService) {}

  @Input() selecionado: MensagemRepositorioSaida;
  @Input() dataReferencia: Date;
  xml: string;
  logOcorrencia;

  ngOnInit(): void {
    this.monitorRepositorioService.obterRepositorioSaidaXml(this.dataReferencia, this.selecionado)
      .subscribe(v => this.xml = v.xml);
    this.monitorRepositorioService.obterRepositorioSaidaLogOcorrencia(this.dataReferencia, this.selecionado)
      .subscribe(v => this.logOcorrencia = v);
  }

  abrirLogOcorrencia(logOcorrencia: LogOcorrencia) {
    this.drawerService.create({
      component: LogOcorrenciaVisualizacaoComponent,
      size: 'medium',
      componentProps: { logOcorrencia }
    });
  }
}
