import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { TemposAnsTipo, TEMPOS_ANS_TIPO_LIST } from 'src/app/shared/model/enum/tempos-ans-tipo';
import { MesesdoAnoEnum } from 'src/app/shared/model/enum/meses-do-ano.enum';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import Seg from '../model/seg';
import { TemposAnsService } from '../service/tempos-ans.service';
import { takeUntil } from "rxjs/operators";
import { DownloadFile } from "src/app/shared/helper/download-file-helper";
import { TemposAnsAnalitico } from 'src/app/shared/model/tempos-ans-analitico';

@Component({
  selector: 'app-tempos-ans',
  templateUrl: './tempos-ans.component.html',
  styleUrls: ['./tempos-ans.component.scss']
})

export class TemposAnsComponent implements OnInit {

  mesesList:  MesesdoAnoEnum[] = new Array();
  filtro$: Subject<any> = new BehaviorSubject(null);

  TemposAnsTipo = TemposAnsTipo;
  exibicao = TEMPOS_ANS_TIPO_LIST;
  dataReferencia: Date;
  exibicaoAtiva = this.TemposAnsTipo.ANALITICO;
  filtroForm: FormGroup;
  download_liberado: boolean = false;
  link: string = "";
  private unsubscribe$ = new Subject();
  private temposAnsAnalitico: TemposAnsAnalitico[] = [];

  seg: Seg = new Seg();
  constructor(
    private formBuilder: FormBuilder,
    private parametrosGlobaisService: ParametrosGlobaisService,
    private ContabilService: TemposAnsService,
    
  ) { }

  ngOnInit() {
    this.dataReferencia = this.parametrosGlobaisService.dataReferencia;
    this.carregarLista();
    this.criarForm();
  }

  private criarForm() {
    this.filtroForm = this.formBuilder.group({
      exibicao: this.TemposAnsTipo.ANALITICO,
      dataInicio: [this.dataReferencia, Validators.required],
      dataFim: [this.dataReferencia, Validators.required],
      // ano: ['', Validators.required],
      // mes: [null, Validators.required],
      empresa: ['2088', Validators.required]
    });

    this.criarFormSubscribe();
  }

  private criarFormSubscribe() {
    this.filtroForm.get('exibicao').valueChanges.subscribe(v => this.exibicaoAtiva = v);
  }

  onPesquisar() {
    const filtro = this.filtroForm.getRawValue();
    this.filtro$.next(filtro);
  }

  onDownload() {
    const filtro = this.filtroForm.getRawValue();
    this.filtro$.next(filtro);
    this.ContabilService
      .gerarExcel(
        this.filtroForm.controls.dataInicio.value,
        this.filtroForm.controls.dataFim.value,
        this.filtroForm.controls.empresa.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => DownloadFile.downloadFile(res));
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

  listaTemposAnsAnalitico(lista: TemposAnsAnalitico[]) {
      this.temposAnsAnalitico = lista;
  }

  onExportarExcel() {
    const excelNome = "Tempo Ans";
    const dataSource ={
      listGeneric:[
        { dsc_ref: "Referência",
          tem_max_blo: "Tempos Transações - Tempo Max Bloqueio",
          per_99_epc_usu_liq: "Perc 99 Tempo Exp Usuario Liq Fora SPI",
          per_50_epc_usu_liq: "Perc 50 Tempo Exp Usuario Liq Fora SPI",
          per_99_epc_usu_liq_spi: "Perc 99 Tempo Exp Usuario Liq SPI",
          per_50_epc_usu_liq_spi: "Perc 50 Tempo Exp Usuario Liq SPI",
          per_epc_usu_exc: "Perc Tempo Exp Usuário Exclusão",
          per_99_tem_usu_csu: "Perc 99 Tempo Usuario Consulta",
          per_tem_env_ptb: "Tempos Dict Perc Tempo Envio Portabilidade",
          per_tem_ntf_ptb: "Tempo Notificação Portabilidade"	,
          num_csu_dict: "Consultas Dict Qtd Consultas",
          per_tem_epc_usu_reg: "Perc Tempo Exp Usuario Registro",
          per_tem_env_reg: "Perc Tempo Envio Registro",
          ind_dip: "Disponibilidade Indice Disponibilidade"
        }
      ]};
      this.temposAnsAnalitico.forEach(item =>{
        dataSource.listGeneric.push({
          dsc_ref: item.dsc_ref,
          tem_max_blo : item.tem_max_blo.toString(),
          per_99_epc_usu_liq: item.per_99_epc_usu_liq.toString(),
          per_50_epc_usu_liq: item.per_50_epc_usu_liq.toString(),
          per_99_epc_usu_liq_spi: item.per_99_epc_usu_liq_spi.toString(),
          per_50_epc_usu_liq_spi: item.per_50_epc_usu_liq_spi.toString(),
          per_epc_usu_exc: item.per_epc_usu_exc.toString(),
          per_99_tem_usu_csu: item.per_99_tem_usu_csu.toString(),
          per_tem_env_ptb: item.per_tem_env_ptb.toString(),
          per_tem_ntf_ptb: item.per_tem_ntf_ptb.toString(),
          num_csu_dict: item.num_csu_dict.toString(),
          per_tem_epc_usu_reg: item.per_tem_epc_usu_reg.toString(),
          per_tem_env_reg: item.per_tem_env_reg.toString(),
          ind_dip: item.ind_dip.toString()
        });
      });
    this.ContabilService
      .exportarExcel(dataSource, excelNome)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => DownloadFile.downloadFile(res));
  }
}
