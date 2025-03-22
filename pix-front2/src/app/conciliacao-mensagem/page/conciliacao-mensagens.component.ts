import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateFormatHelper } from 'src/app/shared/helper/date-format-helper';
import { AgrupadorMensagemTarifada } from 'src/app/shared/model/enum/agrupador-mensagem-tarifada';
import { MensagemTarifadaGrupoDTO } from 'src/app/shared/model/mensagem-tarifada-grupo';
import { ValorFinanceiroPipe } from 'src/app/shared/pipe/valor-financeiro.pipe';
import { ParametrosGlobaisService } from '../../shared/service/parametros-globais.service';
import Seg from '../model/seg';
import { ConciliacaoMensagemService } from '../service/conciliacao-mensagem.service';

@Component({
  selector: 'app-conciliacao-mensagens',
  templateUrl: './conciliacao-mensagens.component.html',
  styleUrls: ['./conciliacao-mensagens.component.scss']
})
export class ConciliacaoMensagensComponent implements OnInit {

  filtroForm: FormGroup;
  dataReferencia: Date;

  grupoMensagemTarifada: any;

  seg:Seg = new Seg();
  private unsubscribe$ = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private parametrosGlobaisService: ParametrosGlobaisService,
    private conciliacaoMensagemService: ConciliacaoMensagemService,
    private valorFinanceiroPipe: ValorFinanceiroPipe,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.dataReferencia = this.parametrosGlobaisService.dataReferencia;
    this.criarForm();
  }

  private criarForm() {
    this.filtroForm = this.formBuilder.group({
      dataInicio: [this.dataReferencia, Validators.required],
      dataFim: [this.dataReferencia, Validators.required]
    });
  }

  pesquisarMensagensTarifadas() {
    const {dataInicio, dataFim} = this.filtroForm.getRawValue();

    this.conciliacaoMensagemService.obterGrupoMensagenTarifada(dataInicio, dataFim)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(grupo => this.grupoMensagemTarifada = [this.montarTreeTable(grupo)]);
  }

  private montarTreeTable(mensagemTarifadaGrupo: MensagemTarifadaGrupoDTO): any {
    const data = {
      titulo: this.obterGrupoData(mensagemTarifadaGrupo),
      agrupador: mensagemTarifadaGrupo.agrupador,
      valorAgrupador: mensagemTarifadaGrupo.valorAgrupador,
    };
    const children = [];
    if (mensagemTarifadaGrupo.grupos) {
      mensagemTarifadaGrupo.grupos.forEach(m => children.push(this.montarTreeTable(m)));
    } else if (mensagemTarifadaGrupo.itens) {
      mensagemTarifadaGrupo.itens.forEach(i => children.push({ data: i }));
    } else {
      // adicionando um cara vazio para aparecer a seta no ultimo grupo
      children.push({ children: [], data: {} });
    }
    return { data, children };
  }

  private obterGrupoData(mensagemTarifadaGrupo: MensagemTarifadaGrupoDTO): string {
    if (mensagemTarifadaGrupo.agrupador === AgrupadorMensagemTarifada.QUANTIDADE) {
      // tslint:disable-next-line:max-line-length
      return `${this.translateService.instant('campo.tarifaQuantidadeMensagensRecebidas')}: ${mensagemTarifadaGrupo.valorAgrupador} (${this.translateService.instant('campo.tarifaDoGrupo')} = R$ ${this.valorFinanceiroPipe.transform(mensagemTarifadaGrupo.valor)}, ${this.translateService.instant('campo.quantidadeDoGrupo')} = ${mensagemTarifadaGrupo.quantidade})`;
    } if (mensagemTarifadaGrupo.agrupador === AgrupadorMensagemTarifada.TAMANHO) {
      // tslint:disable-next-line:max-line-length
      return `${this.translateService.instant('campo.tarifaTamanhoMensagensRecebidas')}: ${mensagemTarifadaGrupo.valorAgrupador} (${this.translateService.instant('campo.tarifaDoGrupo')} = R$ ${this.valorFinanceiroPipe.transform(mensagemTarifadaGrupo.valor)}, ${this.translateService.instant('campo.tamanhoDoGrupo')} = ${mensagemTarifadaGrupo.quantidade}) MB`;
    }
    // tslint:disable-next-line:max-line-length
    return `${this.translateService.instant('campo.valorTotal')}: R$ ${this.valorFinanceiroPipe.transform(mensagemTarifadaGrupo.valor)}`;
  }
}
