import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DownloadFile } from 'src/app/shared/helper/download-file-helper';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import { PreferenciaUsuarioService } from 'src/app/shared/service/preferencia-usuario.service';
import { HistoricoLogin } from '../../model/historicoLogin';
import { SegService } from '../../services/seg.service';
import {Seg} from './model/seg';

@Component({
  selector: 'app-historico-login',
  templateUrl: './historico-login.component.html',
  styleUrls: ['./historico-login.component.scss']
})
export class HistoricoLoginComponent implements OnInit {
  public ds: SinqiaDataSource<HistoricoLogin>
  historicoLogin: HistoricoLogin[];
  dataReferencia: Date;
  filtroForm: FormGroup;
  dataIni: Date;
  dataFim: Date;
  numeroLinhas: number;
  listaQuantidadeLinhas: number[];
  private unsubscribe$ = new Subject();


  constructor(
    private segService: SegService,
    private parametrosGlobaisService: ParametrosGlobaisService,
    private formBuilder: FormBuilder,
    private preferenciasUsuario: PreferenciaUsuarioService) { }

  seg: Seg = new Seg();
  ngOnInit(): void {
    this.dataReferencia = this.parametrosGlobaisService.dataReferencia;
    this.segService.obterHistoricoLogin()
    .subscribe( historico => {
      this.historicoLogin = historico;
    })
    this.criarForm();
    this.numeroLinhas = this.preferenciasUsuario.numeroLinhasPagina;
    this.listaQuantidadeLinhas = this.preferenciasUsuario.listaLinhaPreferenciaUsuario;
  }


  private criarForm() {
    this.filtroForm = this.formBuilder.group({
      usuario: "",
      dataIni: [this.dataReferencia],
      dataFim: [this.dataReferencia],
    });

    this.onPesquisar();
  }

  onPesquisar() {
    var filtro = this.filtroForm.getRawValue();
    this.segService.obterHistoricoLoginFiltro(filtro)
    .subscribe( historico => {
      this.historicoLogin = historico;
    })


  }

  onExportarExcel() {
    const excelNome = "HistoricoLogin";
    console.log(this.historicoLogin);
    const dataSource ={
      listGeneric:[
        { nomUsu:"Nome do usuário",
          dataLogin:"Data",
          ip: "IP",
          flgLgiVal: "Login Válido",
          descErr: "Descrição Erro Login",
          numSeqLgi: "Num. Seq. Login"
        }
      ]};
      this.historicoLogin.forEach(item =>{
        dataSource.listGeneric.push({
          nomUsu: item.nomUsu,
          dataLogin : item.dataLogin.toString(),
          ip: item.ip,
          flgLgiVal: item.flgLgiVal,
          descErr: item.descErr.toString(),
          numSeqLgi: item.numSeqLgi.toString()
        });
      });
    this.segService
      .exportarExcel(dataSource, excelNome)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => DownloadFile.downloadFile(res));
  }
}
