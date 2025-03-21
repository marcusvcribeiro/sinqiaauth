import { PreferenciaUsuarioService } from 'src/app/shared/service/preferencia-usuario.service';
import { HistoricoFuncaoUsuario } from 'src/app/seg/model/historicoFuncaoUsuario';
import { Component, OnInit } from '@angular/core';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import { SegService } from '../../services/seg.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import {Seg} from './model/seg';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DownloadFile } from 'src/app/shared/helper/download-file-helper';

@Component({
  selector: 'app-historico-funcoes',
  templateUrl: './historico-funcoes.component.html',
  styleUrls: ['./historico-funcoes.component.scss']
})
export class HistoricoFuncoesComponent implements OnInit {

  public ds: SinqiaDataSource<HistoricoFuncaoUsuario>
  historicoFuncao: HistoricoFuncaoUsuario[];
  dataReferencia: Date;
  filtroForm: FormGroup;
  dataIni: Date;
  dataFim: Date;
  numeroLinhas: number;
  listaQuantidadeLinhas: number[];
  private unsubscribe$ = new Subject();


  constructor(private segService: SegService,
     private parametrosGlobaisService: ParametrosGlobaisService,
     private formBuilder: FormBuilder,
     private preferenciasUsuario: PreferenciaUsuarioService) { }

  seg: Seg = new Seg();

  ngOnInit(): void {
    this.dataReferencia = this.parametrosGlobaisService.dataReferencia;
    this.segService.obterHistoricoFuncaoUsuario()
    .subscribe( historico => {
      this.historicoFuncao = historico;
    })
    this.criarForm();
    this.numeroLinhas = this.preferenciasUsuario.numeroLinhasPagina;
    this.listaQuantidadeLinhas = this.preferenciasUsuario.listaLinhaPreferenciaUsuario;
  }


  private criarForm() {
    this.filtroForm = this.formBuilder.group({
      usuario: "",
      funcionalidade:"",
      dataIni: [this.dataReferencia],
      dataFim: [this.dataReferencia],
    });
   this.onPesquisar();
  }

  onPesquisar(){
    var filtro = this.filtroForm.getRawValue();
    this.segService.obterHistoricoFuncaoUsuarioFiltro(filtro)
    .subscribe( historico => {
      this.historicoFuncao= historico;
    });
  }


  onExportarExcel() {
    const excelNome = "HistoricoFuncaoUsuario";
    const dataSource ={listGeneric:[{nome:"Nome",descricaoFuncionalidade:"Descrição Funcionalidade",dataHistoricoFuncao: "Data"}]};
    this.historicoFuncao.forEach(item =>{
      dataSource.listGeneric.push({
       nome: item.nome,
       descricaoFuncionalidade: item.descricaoFuncionalidade,
       dataHistoricoFuncao: item.dataHistoricoFuncao.toString()
      })
    });
    this.segService
      .exportarExcel(dataSource, excelNome)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => DownloadFile.downloadFile(res));
  }
}
