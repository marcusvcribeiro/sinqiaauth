import { DrawerService } from '@albert/ui';
import { Component, Input, OnInit } from '@angular/core';
import { BoletagemConsultaService } from 'src/app/boletagem-consulta/service/boletagem.service';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { MensagemTransacao } from 'src/app/shared/model/mensagem-transacao';

@Component({
  selector: 'app-mensagem-transacao',
  templateUrl: './mensagem-transacao.component.html',
})
export class MensagemTransacaoComponent implements OnInit {

  @Input() dataTransacao: Date;
  @Input() idTransacao: number;
  public ds: SinqiaDataSource<MensagemTransacao>;

  constructor(
    private boletagemConsultaService: BoletagemConsultaService,
    private drawerService: DrawerService) { }

  ngOnInit() {
    this.ds = SinqiaDataSource.of<MensagemTransacao>()
      .fromNonPageableService((d) => {
        return this.boletagemConsultaService.listarMensagemTransacao(
          { dataReferencia: this.dataTransacao, numeroSequenciaTransacao: this.idTransacao });
      })
      .build();
  }

  onClick(mensagem: MensagemTransacao) {
    // Solução definida para evitar circular dependency
    import('../boleto-visualizacao/boleto-visualizacao.component').then(m => {
      this.drawerService.create({
        component: m.BoletoVisualizacaoComponent,
        size: 'large',
        componentProps: { transacaoRelacionada: mensagem }
      });
    });
  }
}
