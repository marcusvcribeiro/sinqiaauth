import { ApuracaoDadosInformesBacenImportarDrawer } from '../component/apuracao-dados-informes-bacen-importar-drawer/apuracao-dados-informes-bacen-importar-drawer.component';
import { DrawerService } from '@albert/ui';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApuracaoTemproProcessamentoTipo, APURACAO_TEMPO_PROCESSAMENTO_TIPO_LIST } from 'src/app/shared/model/enum/apuracao-tempo-processamento';
import { MesesdoAnoEnum } from 'src/app/shared/model/enum/meses-do-ano.enum';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import { ApuracaoDadosInformesBacenGerarDrawerComponent } from '../component/apuracao-dados-informes-bacen-gerar-drawer/apuracao-dados-informes-bacen-gerar-drawer.component';
import Seg from '../model/seg';
import { ApuracaoDadosInformesBacenService } from 'src/app/apuracao-dados-informes-bacen/service/apuracao-dados-informes-bacen.service';
import { DownloadFile } from 'src/app/shared/helper/download-file-helper';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-apuracao-dados-informes-bacen',
  templateUrl: './apuracao-dados-informes-bacen.component.html',
  styleUrls: ['./apuracao-dados-informes-bacen.component.scss']
})

export class ApuracaoDadosInformesBacenComponent implements OnInit {

  mesesList:  MesesdoAnoEnum[] = new Array();
  filtro$: Subject<any> = new BehaviorSubject(null);

  apuracaoTemproProcessamentoTipo = ApuracaoTemproProcessamentoTipo;
  exibicao = APURACAO_TEMPO_PROCESSAMENTO_TIPO_LIST;
  dataReferencia: Date;
  exibicaoAtiva = this.apuracaoTemproProcessamentoTipo.SINTETICO;
  filtroForm: FormGroup;

  seg: Seg = new Seg();
  constructor(
    private formBuilder: FormBuilder,
    private parametrosGlobaisService: ParametrosGlobaisService,
    private drawerService: DrawerService,
    private informesBacenService: ApuracaoDadosInformesBacenService
  ) { }

  ngOnInit() {
    this.dataReferencia = this.parametrosGlobaisService.dataReferencia;
    this.carregarLista();
    this.criarForm();
  }

  private criarForm() {
    this.filtroForm = this.formBuilder.group({
      exibicao: this.apuracaoTemproProcessamentoTipo.SINTETICO,
      ano: [this.dataReferencia.getFullYear(), Validators.required],
      mes: [this.dataReferencia.getMonth() + 1, Validators.required]
    });

    this.criarFormSubscribe();
    this.onPesquisar();
  }

  private criarFormSubscribe() {
    this.filtroForm.get('exibicao').valueChanges.subscribe(v => this.exibicaoAtiva = v);
  }

  onPesquisar() {
    const filtro = this.filtroForm.getRawValue();
    this.filtro$.next(filtro);
  }

  onTrocarTab(tipoTab: ApuracaoTemproProcessamentoTipo) {
    this.exibicaoAtiva = tipoTab;
    this.filtroForm.get('exibicao').setValue(tipoTab);
  }

  onImportar(){
    this.drawerService.create({
      component: ApuracaoDadosInformesBacenImportarDrawer,
      size: 'large',
      componentProps: {  }
    });
  }

  private unsubscribe$ = new Subject();
  onExportar(){
    const filtro = this.filtroForm.getRawValue();
    this.informesBacenService.exportar({
      ano: this.filtroForm.get('ano').value,
      mes: this.filtroForm.get('mes').value,
      tipo: this.getTipoExportacao()
    })
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => DownloadFile.downloadFile(res));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getTipoExportacao() {
    switch(this.exibicaoAtiva){
      case ApuracaoTemproProcessamentoTipo.ANALITICO: return 'spi';
      case ApuracaoTemproProcessamentoTipo.SINTETICO: return 'dict';
      case ApuracaoTemproProcessamentoTipo.BLOQUEIO: return 'bloqueadas';
      case ApuracaoTemproProcessamentoTipo.DISPONIBILIDADE: return 'disponibilidade';
      default: return '';
    }
  }

  onGerar(){
    this.drawerService.create({
      component: ApuracaoDadosInformesBacenGerarDrawerComponent,
      size: 'small',
      componentProps: {  }
    });
  }

  private carregarLista(){
    this.mesesList.push(MesesdoAnoEnum.Janeiro);
    this.mesesList.push(MesesdoAnoEnum.Fevereiro);
    this.mesesList.push(MesesdoAnoEnum.Marco);
    this.mesesList.push(MesesdoAnoEnum.Abril);
    this.mesesList.push(MesesdoAnoEnum.Maio);
    this.mesesList.push(MesesdoAnoEnum.Junho);
    this.mesesList.push(MesesdoAnoEnum.Julho);
    this.mesesList.push(MesesdoAnoEnum.Agosto);
    this.mesesList.push(MesesdoAnoEnum.Setembro);
    this.mesesList.push(MesesdoAnoEnum.Outubro);
    this.mesesList.push(MesesdoAnoEnum.Novembro);
    this.mesesList.push(MesesdoAnoEnum.Dezembro);
  }


}
