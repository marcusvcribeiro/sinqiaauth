import { DrawerService } from '@albert/ui';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ComposicaoOperacao } from 'src/app/shared/model/composicao-operacao';
import { HistoricoComposicao } from 'src/app/shared/model/historico-composicao';
import { Mensagem } from 'src/app/shared/model/mensagem';
import { ComposicaoOperacaoService } from 'src/app/shared/service/composicao-operacao.service';
import { BoletoComponent } from '../boleto/boleto.component';

@Component({
  selector: 'app-boleto-composicao',
  templateUrl: './boleto-composicao.component.html',
  styleUrls: ['boleto-composicao.component.scss']
})
export class BoletoComposicaoComponent implements OnInit {

  form: FormGroup;
  composicaoOperacoes$: Observable<ComposicaoOperacao[]>;
  updateHistoricoPesquisaComposicao = true;

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private drawerService: DrawerService,
    private composicaoOperacaoService: ComposicaoOperacaoService
  ) { }

  ngOnInit() {
    this.criarForm();
  }

  criarForm() {
    this.form = this.formBuilder.group({
      mensagem: [],
      sistema: [],
      produto: [],
      operacaoBancaria: [],
      liquidacao: [],
    });
  }

  onPesquisarClick() {
    const values = this.form.getRawValue();
    this.composicaoOperacoes$ = this.composicaoOperacaoService
      .listarComposicaoOperacoes(values).pipe(tap(v => this.updateHistoricoPesquisaComposicao = !this.updateHistoricoPesquisaComposicao));
  }

  onAbrirBoletoClick(composicaoOperacao: ComposicaoOperacao) {
    this.drawerService.create({
      component: BoletoComponent,
      size: 'large',
      title: this.translateService.instant('titulo.novoBoleto'),
      componentProps: {
        composicaoOperacao
      }
    });
  }

  onHistoricoSelecionado(historico: HistoricoComposicao) {
    this.form.get('mensagem').setValue(historico.codigoMensagem);
    this.form.get('sistema').setValue(historico.sistema);
    this.form.get('operacaoBancaria').setValue(historico.operacaoBancaria);
    this.onPesquisarClick();
  }

  onSearchCodigoMensagem(term: string, item: Mensagem) {
    const codigo = item.codigoMensagem.toLocaleLowerCase();
    const descricao = item.descricao.toLocaleLowerCase();
    const valorDigitado = term.toLocaleLowerCase();

    return codigo.includes(valorDigitado) || descricao.includes(valorDigitado);
  }
}
