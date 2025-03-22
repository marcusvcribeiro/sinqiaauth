import { Component, OnInit, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { LogOcorrenciaService } from '../../service/log-ocorrencia.service';
import { Observable, Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SinqiaDataSource } from '../../../shared/helper/sinqia-data-source';
import { TipoAlerta } from 'src/app/shared/model/enum/tipo-alerta';
import { Ocorrencia } from 'src/app/shared/model/ocorrencia';
import { LogOcorrencia } from 'src/app/shared/model/log-ocorrencia';
import { DrawerService } from '@albert/ui';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import { TranslateService } from '@ngx-translate/core';
import { ConsultaService } from 'src/app/shared/service/consulta.service';
import { KeyValue } from 'src/app/shared/model/key-value';
import { LogOcorrenciaVisualizacaoComponent } from '../log-ocorrencia-visualizacao/log-ocorrencia-visualizacao.component';
import { takeUntil } from 'rxjs/operators';
import { DownloadFile } from 'src/app/shared/helper/download-file-helper';
import { Condicao } from 'src/app/shared/model/enum/condicao';
import { Campo } from 'src/app/shared/helper/filter-condition-builder';

@Component({
  selector: 'app-consulta-log-ocorrencia-list',
  templateUrl: './consulta-log-ocorrencia-list.component.html',
  styleUrls: ['./consulta-log-ocorrencia-list.component.scss'],
  providers: [LogOcorrenciaService]
})
export class ConsultaLogOcorrenciaListComponent implements OnInit, OnDestroy, OnChanges {

  @Input() filtro;
  @Input() tipoAlertaExportar$: Observable<number>;
  @Input() tipoAlerta: TipoAlerta;

  dataReferencia: Date;
  condicaoTipo: Campo;

  iconeOptions = {
    classeCor: '',
    iconeTipo: ''
  };

  public ds: SinqiaDataSource<LogOcorrencia>;

  private unsubscribe$ = new Subject();

  checkbox = new SelectionModel<any>(true, []);

  formTableFilter: FormGroup;

  constructor(private logOcorrenciaService: LogOcorrenciaService,
    private formBuilder: FormBuilder,
    private drawerService: DrawerService,
    private parametrosGlobaisService: ParametrosGlobaisService,
    private translateService: TranslateService,
    private consultaService: ConsultaService
  ) { }

  ngOnInit() {
    this.dataReferencia = this.filtro ? this.filtro.dataReferencia : this.parametrosGlobaisService.dataReferencia;
    this.criarFiltroTabela();
    this.criarDataSource();
    //this.buscarOcorrencias();

    this.tipoAlertaExportar$.pipe(takeUntil(this.unsubscribe$)).subscribe((tipoAlerta) => {
      if (tipoAlerta === this.tipoAlerta) {
        this.onExportarExcel();
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnChanges(change: SimpleChanges) {
    const { filtro } = change;
    if (filtro && this.formTableFilter) {
      this.formTableFilter.get('dataReferencia').setValue(filtro.currentValue.dataReferencia);
      this.ds.filter();
    }
  }

  private criarFiltroTabela() {
    this.formTableFilter = this.formBuilder.group({
      numeroSequencia: null,
      dataReferencia: [this.dataReferencia, Validators.required],
      dataInclusao: null,
      ocorrencia: null,
      sistema: null,
      tipoOcorrencia: null
    });
    this.condicaoTipo = { campo: 'TIPO_OCORRENCIA', operador: Condicao.IGUAL, valor: this.tipoAlerta.toString() };
  }

  private criarDataSource() {
    this.ds = SinqiaDataSource.of<LogOcorrencia>()
      .withBody(this.formTableFilter)
      .fromService((d: any) =>
        this.logOcorrenciaService.listarLogOcorrencias(d,this.formTableFilter.getRawValue(), this.condicaoTipo))
      .multiSelectable()
      .build();
  }

  private buscarOcorrencias() {
    switch (this.tipoAlerta) {
      case TipoAlerta.Erro:
        this.defineIcone('error', 'error');
        break;

      case TipoAlerta.Aviso:
        this.defineIcone('warning', 'warning');
        break;

      default:
        this.defineIcone('info', 'info');
        break;
    }
    this.formTableFilter.get('tipoOcorrencia').setValue(this.tipoAlerta);
    this.ds.filter();
  }

  private defineIcone(classeCor, iconeTipo) {
    this.iconeOptions = {
      classeCor,
      iconeTipo
    };
  }

  private onExportarExcel() {
    if (this.formTableFilter) {
      this.logOcorrenciaService.exportarExcel(this.formTableFilter.getRawValue())
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => DownloadFile.downloadFile(res));
    }
  }

  onVisualizarOcorrencia(logOcorrencia: LogOcorrencia) {
    this.drawerService.create({
      component: LogOcorrenciaVisualizacaoComponent,
      size: 'medium',
      componentProps: { logOcorrencia },
      title: this.translateService.instant('titulo.logOcorrencia')
    });
  }
}
