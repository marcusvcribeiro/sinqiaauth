import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { ConsultaMensagem } from 'src/app/shared/model/consulta-mensagem';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import { ConsultaMensagemService } from '../service/consulta-mensagem.service';
import { BottomSheetService } from '@albert/layout';
import { DetalheConsultaMensagemComponent } from '../component/detalhe-consulta-mensagem/detalhe-consulta-mensagem.component';
import Seg from '../model/seg';

@Component({
  selector: 'app-consulta-mensagem',
  templateUrl: './consulta-mensagem.component.html',
  styleUrls: ['./consulta-mensagem.component.scss']
})

export class ConsultaMensagemComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  filtroAvancadoForm: FormGroup;

  public ds: SinqiaDataSource<ConsultaMensagem>;
  seg: Seg = new Seg();
  constructor(
    private formBuilder: FormBuilder,
    private parametrosGlobaisService: ParametrosGlobaisService,
    private consultaMensagemService: ConsultaMensagemService,
    private bottomSheetService: BottomSheetService
  ) { }

  ngOnInit(): void {
    this.criarDataSource();
    this.criarFormFiltros();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private criarFormFiltros(): void {
    this.filtroAvancadoForm = this.formBuilder.group({
      
      dataInicio: [this.parametrosGlobaisService.dataReferencia], // TODO: verificar o problema de quando o date picker inicia com valor
      dataFim: [this.parametrosGlobaisService.dataReferencia], // TODO: verificar o problema de quando o date picker inicia com valor
      idMensagem: [],
      numeroUnicoOperacao: [],
      idSituacaoMensagem: [],
      idEntidadeParticipanteEmissor: [],
      idEntidadeParticipanteDestino: [],
      sequenciaMensagemTransacao: [],
      contingencia: [false],
      copiaMensagem: [false],
      mensagem: []
    });
  }


  criarDataSource() {
    this.ds = SinqiaDataSource.of<ConsultaMensagem>()
      .fromService((d) => {
        return this.consultaMensagemService.listarMensagens(this.filtroAvancadoForm.getRawValue(), d);
      })
      .build();
  }

  onDetalhe(mensagem: ConsultaMensagem) {
    this.bottomSheetService.create({
      component: DetalheConsultaMensagemComponent,
      componentProps: { mensagem }
    });
  }

}
