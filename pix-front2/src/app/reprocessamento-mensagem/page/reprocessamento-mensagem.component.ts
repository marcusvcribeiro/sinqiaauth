import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { TipoReprocessamentoMensagem, TIPO_REPROCESSAMENTO_MENSAGEM_LIST } from 'src/app/shared/model/enum/reprocessamento-mensagem';
import { Seg } from '../model/seg';

@Component({
  selector: 'app-reprocessamento-mensagem',
  templateUrl: './reprocessamento-mensagem.component.html',
  styleUrls: ['./reprocessamento-mensagem.component.scss']
})
export class ReprocessamentoMensagemPageComponent implements OnInit {

  filtroForm: FormGroup;
  dataAutorizacao$: Subject<FormGroup> = new BehaviorSubject(null);
  dataReferencia: Date;

  tipoReprocessamentoMensagem = TipoReprocessamentoMensagem;
  tipoReprocessamentoSelecionado = TipoReprocessamentoMensagem.ENVIO;
  tiposReprocessamentoMensagemList = TIPO_REPROCESSAMENTO_MENSAGEM_LIST;

  seg: Seg = new Seg();

  constructor(
    private formBuilder: FormBuilder,
    private parametrosGlobaisService: ParametrosGlobaisService) {
  }

  ngOnInit(): void {
    this.dataReferencia = this.parametrosGlobaisService.dataReferencia;
    this.criarForm();
  }

  onPesquisar() {
    const dataAutorizacao = this.filtroForm.getRawValue().dataAutorizacao;
    this.dataAutorizacao$.next(dataAutorizacao);
  }

  private criarForm() {
    this.filtroForm = this.formBuilder.group({
      dataAutorizacao: [this.dataReferencia, Validators.required],
    });
    this.onPesquisar();
  }

}
