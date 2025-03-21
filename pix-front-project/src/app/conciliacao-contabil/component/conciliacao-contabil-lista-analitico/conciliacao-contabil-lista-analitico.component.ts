import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { ConciliacaoContabilTipo } from 'src/app/shared/model/enum/conciliacao-contabil';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import { ConciliacaoContabilService } from '../../service/conciliacao-contabil.service';
import { ConciliacaoContabilAnalitico } from 'src/app/shared/model/conciliacao-contabil-analitico';

@Component({
  selector: 'app-conciliacao-contabil-lista-analitico',
  templateUrl: './conciliacao-contabil-lista-analitico.component.html'
})

export class ConciliacaoContabilListaAnaliticoComponent implements OnInit {

  public ds: SinqiaDataSource<ConciliacaoContabilAnalitico>;
  @Input() filtro;
  filtroForm: FormGroup;
  conciliacaoContabilTipo = ConciliacaoContabilTipo;
  dataReferencia: Date;

  constructor(private ConciliacaoContabilService: ConciliacaoContabilService,
    private formBuilder: FormBuilder,
    private parametrosGlobaisService: ParametrosGlobaisService) {
  }

  ngOnInit(): void {
    this.dataReferencia = this.parametrosGlobaisService.dataReferencia;
    this.criarForm();
    this.criarDataSource();
  }

  ngOnChanges(change: SimpleChanges) {
    const { filtro } = change;

    if (this.ds && filtro) {
      this.filtroForm.patchValue(this.filtro);
      this.ds.filter();
    }
  }

  private criarForm() {
    this.filtroForm = this.formBuilder.group({
      exibicao: this.conciliacaoContabilTipo.ANALITICO,
      dataInicio: [this.dataReferencia, Validators.required],
      dataFim: [this.dataReferencia, Validators.required],
      empresa: ['2088', Validators.required],
      contabilContaBancaria: [''],
      contabilFormaPagamento: [''],
      contabilNatureza: [''],
      contabilCentroCusto: ['']
    });
  }


  private criarDataSource() {
    this.ds = SinqiaDataSource.of<ConciliacaoContabilAnalitico>()
      .withFilter(this.filtroForm)
      .fromNonPageableService(this.ConciliacaoContabilService.listarConcilicaoContabilAnalitico.bind(this.ConciliacaoContabilService))
      .initialize(false)
      .build();
  }
}
