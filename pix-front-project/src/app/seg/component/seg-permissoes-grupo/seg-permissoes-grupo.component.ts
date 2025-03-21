import { Grupo } from "./../../model/grupo";
import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { DrawerService } from "@albert/ui";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PixMessageService } from "src/app/shared/service/pix-message-service";
import { SegService } from "../../services/seg.service";
import { FuncaoSisGrupo } from "../../model/funcaoSisGrupo";
import { FuncaoSistema } from "../../model/funcaoSistema";
import { TIPO_ATIVO_LIST } from "src/app/shared/model/enum/tipo-ativo";
import { TIPO_STATUS_LIST } from "../../enum/tipoStatus";
import { throwError } from "rxjs";
import * as moment from "moment";
import { OperacaoSeg } from "../../model/operacao.enum";
import { environment } from "src/environments/environment";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DownloadFile } from 'src/app/shared/helper/download-file-helper';

@Component({
  selector: "app-seg-permissoes-grupo",
  templateUrl: "./seg-permissoes-grupo.component.html",
  styleUrls: ["./seg-permissoes-grupo.component.scss"],
})
export class SegPermissoesGrupoComponent implements OnInit {
  @Input() edit?: Grupo;

  form: FormGroup;
  listaFuncoes: FuncaoSistema[];
  listaFuncoesPermissoes: FuncaoSistema[];
  listaFuncoesVincGrupo: FuncaoSistema[];
  listaFunSisGrupo: FuncaoSisGrupo[];
  tipoStatus = TIPO_STATUS_LIST;

  inserir: OperacaoSeg = OperacaoSeg.Inserir;
  excluir: OperacaoSeg = OperacaoSeg.Excluir;
  
  private unsubscribe$ = new Subject();

  constructor(
    private formBuild: FormBuilder,
    private pixMessageService: PixMessageService,
    private drawerService: DrawerService,
    private segService: SegService,
    private cdref: ChangeDetectorRef
  ) {}

  get controls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.listaFuncoesVincGrupo = new Array();
    this.listaFunSisGrupo = new Array();
    this.listaFuncoesPermissoes = new Array();
    this.instanceFormGroupForFuncaoSisGrupo();
    this.carregarListas();
  }

  onAddList() {
    var model = this.getGrupoObject();
    var codigoFuncao = null;
    codigoFuncao = this.listaFuncoesPermissoes.find(
      (x) => x.id === model.codFun
    );
    if (codigoFuncao !== undefined) {
      this.pixMessageService.toastInfo('Essa função já foi atribuida ao grupo!');
    } else {
      var funcao = new FuncaoSistema();
      funcao = this.listaFuncoes.find((x) => x.id === model.codFun);
      funcao.operacao = OperacaoSeg.Inserir;
      this.listaFuncoesPermissoes.push(funcao);
      this.listaFuncoesPermissoes = [...this.listaFuncoesPermissoes];
    }
  }

  private getGrupoObject(): FuncaoSisGrupo {
    var model = new FuncaoSisGrupo();
    model.id = this.controls.codGrp.value;
    model.codSistema = this.controls.codSis.value;
    model.codFun = this.controls.codFun.value;
    model.codUsuUltMnt = 1;
    model.datUltMnt = moment();
    model.datInc = moment();
    model.codUsuInc = 1;
    model.flgAtiIna = "A";
    return model;
  }

  ngAfterViewInit(): void {
    this.segService
      .getFuncoesSisGrupo(this.edit.id)
      .subscribe((data) => (this.listaFuncoesPermissoes = data));
    this.cdref.detectChanges();
  }

  private instanceFormGroupForFuncaoSisGrupo() {
    this.form = this.formBuild.group({
      codGrp:{value: this.edit.id, disabled:true} ,
      codSis:  {value: environment.sistema, disabled:true},
      codFun:{value: null, require:true}
    });
  }

  onSave() {
    const lista: FuncaoSistema[] = this.listaFuncoesPermissoes.filter(
      (x) => x.operacao != OperacaoSeg.Default
    );

    this.segService
      .atribuirFuncoesAoGrupo(this.controls.codGrp.value, lista)
      .subscribe((data) => {
        this.pixMessageService.toastSuccess("mensagem.operacaoSucesso");
        this.drawerService.close();
      });
  }

  remover(funcao: FuncaoSistema) {
    if (funcao.operacao == OperacaoSeg.Default) {
      funcao.operacao = OperacaoSeg.Excluir;
    } else {
      this.listaFuncoesPermissoes.splice(
        this.listaFuncoesPermissoes.findIndex((x) => x.id == funcao.id),
        1
      );
      this.listaFuncoesPermissoes = [...this.listaFuncoesPermissoes];
    }
  }

  desfazer(funcao: FuncaoSistema) {
    if (funcao.operacao == OperacaoSeg.Excluir) {
      funcao.operacao = OperacaoSeg.Default;
    }
  }

  private carregarListas() {
    this.segService
      .getFuncoesPorSistema()
      .subscribe((data) => (this.listaFuncoes = data));
  }
  onExportarExcel() {
    const excelNome = "FuncionalidadeGrupos";
    const dataSource ={listGeneric:[{item1:"Grupo",item2:"Sistema",item3: ""}]};
    dataSource.listGeneric.push({item1:this.controls.codGrp.value,item2:this.controls.codSis.value,item3: ""});
    dataSource.listGeneric.push({item1:"Permissões",item2:"",item3: ""});
    this.listaFuncoesPermissoes.forEach(item =>{
      dataSource.listGeneric.push({
        item1: item.nome,
        item2: "",
        item3: ""
      })
    });
    this.segService
      .exportarExcel(dataSource, excelNome)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => DownloadFile.downloadFile(res));
  }
}
