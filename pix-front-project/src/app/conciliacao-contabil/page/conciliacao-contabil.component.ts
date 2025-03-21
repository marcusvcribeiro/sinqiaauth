import { DrawerService } from '@albert/ui';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { ConciliacaoContabilTipo, CONCILIACAO_CONTABIL_TIPO_LIST } from 'src/app/shared/model/enum/conciliacao-contabil';
import { MesesdoAnoEnum } from 'src/app/shared/model/enum/meses-do-ano.enum';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import Seg from '../model/seg';
import { ConciliacaoContabilService } from '../service/conciliacao-contabil.service';
import { takeUntil } from "rxjs/operators";
import { DownloadFile } from "src/app/shared/helper/download-file-helper";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-conciliacao-contabil',
  templateUrl: './conciliacao-contabil.component.html',
  styleUrls: ['./conciliacao-contabil.component.scss']
})

export class ConciliacaoContabilComponent implements OnInit {

  mesesList: MesesdoAnoEnum[] = new Array();
  filtro$: Subject<any> = new BehaviorSubject(null);

  ConciliacaoContabilTipo = ConciliacaoContabilTipo;
  exibicao = CONCILIACAO_CONTABIL_TIPO_LIST;
  dataReferencia: Date;
  cookieEmpresa: string;
  cookieContaBancaria: string;
  cookieFormaPagamento: string;
  cookieNatureza: string;
  cookieCentroCusto: string; 
  exibicaoAtiva = this.ConciliacaoContabilTipo.ANALITICO;
  filtroForm: FormGroup;
  download_liberado: boolean = false;
  link: string = "";
  private unsubscribe$ = new Subject();

  seg: Seg = new Seg();
  constructor(
    private formBuilder: FormBuilder,
    private parametrosGlobaisService: ParametrosGlobaisService,
    private ContabilService: ConciliacaoContabilService,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    this.dataReferencia = this.parametrosGlobaisService.dataReferencia;
    this.carregarLista();
    this.carregarCookies();
    this.criarForm();
  }

  private criarForm() {
    this.filtroForm = this.formBuilder.group({
      exibicao: this.ConciliacaoContabilTipo.ANALITICO,
      dataInicio: [this.dataReferencia, Validators.required],
      dataFim: [this.dataReferencia, Validators.required],
      // ano: ['', Validators.required],
      // mes: [null, Validators.required],
      empresa: [this.cookieEmpresa, Validators.required],
      contabilContaBancaria: [this.cookieContaBancaria, Validators.required],
      contabilFormaPagamento: [this.cookieFormaPagamento, Validators.required],
      contabilNatureza: [this.cookieNatureza, Validators.required],
      contabilCentroCusto: [this.cookieCentroCusto, Validators.required],
    });

    this.criarFormSubscribe();
  }

  private criarFormSubscribe() {
    this.filtroForm.get('exibicao').valueChanges.subscribe(v => this.exibicaoAtiva = v);
  }

  onPesquisar() {
    const filtro = this.filtroForm.getRawValue();
    this.filtro$.next(filtro);
    this.guardarCookies();

  }

  onDownload() {
    const filtro = this.filtroForm.getRawValue();
    this.filtro$.next(filtro);
    this.ContabilService
      .gerarExcel(
        this.filtroForm.controls.dataInicio.value,
        this.filtroForm.controls.dataFim.value,
        this.filtroForm.controls.empresa.value,
        this.filtroForm.controls.contabilContaBancaria.value,
        this.filtroForm.controls.contabilFormaPagamento.value,
        //this.filtroForm.controls.contabilHistoricoPadrao.value,
        '0',
        //this.filtroForm.controls.contabilCliente.value,
        '0',
        this.filtroForm.controls.contabilNatureza.value,
        this.filtroForm.controls.contabilCentroCusto.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => DownloadFile.downloadFile(res));
  }

  // download() {
  //   const filename = this.link.substring(this.link.replace('.xml','').lastIndexOf('/') + 1);
  //   this.ContabilService
  //     .download(this.link)
  //     .subscribe((res) => {
  //       console.log('retorno');
  //       let dataType = 'xml';
  //       let binaryData = [];
  //       binaryData.push(res);
  //       let downloadLink = document.createElement("a");
  //       downloadLink.href = window.URL.createObjectURL(
  //         new Blob(binaryData, { type: dataType })
  //       );
  //       downloadLink.setAttribute("download", filename);
  //       document.body.appendChild(downloadLink);
  //       downloadLink.click();
  //     });
  // }

  private carregarLista() {
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

  private carregarCookies() {
    this.cookieEmpresa = this.cookieService.get('cookieEmpresa');
    this.cookieEmpresa = (this.cookieEmpresa == undefined || this.cookieEmpresa == '') ? '2088':this.cookieEmpresa;

    this.cookieContaBancaria = this.cookieService.get('cookieContaBancaria');
    this.cookieContaBancaria = (this.cookieContaBancaria == undefined || this.cookieContaBancaria == '') ? '16': this.cookieContaBancaria;

    this.cookieFormaPagamento = this.cookieService.get('cookieFormaPagamento');
    this.cookieFormaPagamento = (this.cookieFormaPagamento == undefined || this.cookieFormaPagamento == '') ? '-':this.cookieFormaPagamento;

    this.cookieNatureza = this.cookieService.get('cookieNatureza');
    this.cookieNatureza = (this.cookieNatureza == undefined || this.cookieNatureza == '') ? '398':this.cookieNatureza;
    
    this.cookieCentroCusto = this.cookieService.get('cookieCentroCusto'); 
    this.cookieCentroCusto = (this.cookieCentroCusto == undefined || this.cookieCentroCusto == '') ? '13211':this.cookieCentroCusto;
  }

  private guardarCookies() {
    this.cookieService.set('cookieEmpresa', this.filtroForm.controls.empresa.value); 
    this.cookieService.set('cookieContaBancaria', this.filtroForm.controls.contabilContaBancaria.value); 
    this.cookieService.set('cookieFormaPagamento', this.filtroForm.controls.contabilFormaPagamento.value); 
    this.cookieService.set('cookieNatureza', this.filtroForm.controls.contabilNatureza.value); 
    this.cookieService.set('cookieCentroCusto', this.filtroForm.controls.contabilCentroCusto.value);    
  }

}
