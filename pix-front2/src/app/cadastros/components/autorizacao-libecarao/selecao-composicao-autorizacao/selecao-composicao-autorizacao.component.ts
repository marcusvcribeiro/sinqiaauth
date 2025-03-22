import { DrawerService } from '@albert/ui';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import Seg from 'src/app/cadastros/model/seg';
import { ComposicaoOperacao } from 'src/app/shared/model/composicao-operacao';
import { HistoricoComposicao } from 'src/app/shared/model/historico-composicao';
import { ComposicaoOperacaoService } from 'src/app/shared/service/composicao-operacao.service';

@Component({
  selector: 'app-selecao-composicao-autorizacao',
  templateUrl: './selecao-composicao-autorizacao.component.html',
  styleUrls: ['./selecao-composicao-autorizacao.component.scss']
})
export class SelecaoComposicaoAutorizacaoComponent implements OnInit {
  formData: FormGroup;

  composicaoOperacoes$: Observable<ComposicaoOperacao[]>;
  updateHistoricoPesquisaComposicao = true;

  seg: Seg = new Seg();

  @Output() event = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private composicaoOperacaoService: ComposicaoOperacaoService,
    private drawerService: DrawerService
  ) { }

  ngOnInit(): void {
    this.instanciarFormulario();
  }

  instanciarFormulario(){
    this.formData = this.formBuilder.group({
      mensagem: [],
      sistema: [],
      operacaoBancaria: [],
    });
  }

  onPesquisar(){
    const values = this.formData.getRawValue();
    this.composicaoOperacoes$ = this.composicaoOperacaoService
      //segundo parametro TRUE é enviado para a requisição retornar todas as mensagens, sem passar por alçada.
      .listarComposicaoOperacoes(values, true)
      .pipe(
        tap(_ => this.updateHistoricoPesquisaComposicao = !this.updateHistoricoPesquisaComposicao)
      );
  }

  onHistoricoSelecionado(historico: HistoricoComposicao){
    this.formData.get('mensagem').setValue(historico.codigoMensagem);
    this.formData.get('sistema').setValue(historico.sistema);
    this.formData.get('operacaoBancaria').setValue(historico.operacaoBancaria);
    this.onPesquisar();
  }

  onSelecionarComposicao(composicao: any){
    this.event.emit(composicao);
    this.drawerService.close();
  }
}
