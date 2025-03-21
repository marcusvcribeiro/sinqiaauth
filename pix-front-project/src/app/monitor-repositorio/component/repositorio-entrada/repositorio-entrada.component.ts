import { Component, Input, OnInit } from '@angular/core';
import { MensagemRepositorio } from 'src/app/shared/model/mensagem-repositorio';
import { MonitorRepositorioService } from '../../service/monitor-repositorio.service';
import { LogOcorrencia } from 'src/app/shared/model/log-ocorrencia';
import { DrawerService } from '@albert/ui';
import { LogOcorrenciaVisualizacaoComponent } from 'src/app/consulta-log-ocorrencia/component/log-ocorrencia-visualizacao/log-ocorrencia-visualizacao.component';

@Component({
  selector: 'app-repositorio-entrada',
  templateUrl: './repositorio-entrada.component.html'
})
export class RepositorioEntradaComponent implements OnInit {

  constructor(
    private monitorRepositorioService: MonitorRepositorioService,
    private drawerService: DrawerService) {}

  @Input() selecionado: MensagemRepositorio;
  @Input() dataReferencia: Date;
  xml: string;
  logOcorrencia;

  ngOnInit(): void {
    this.monitorRepositorioService.obterRepositorioEntradaXml(this.dataReferencia, this.selecionado)
      .subscribe(v => this.xml = v.xml);
    this.monitorRepositorioService.obterRepositorioEntradaLogOcorrencia(this.dataReferencia, this.selecionado)
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
