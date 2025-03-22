import { Usuario } from './../../model/usuario';
import { Component, Input, OnInit } from '@angular/core';
import { DrawerService } from '@albert/ui';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApuracaoDadosInformesBacenService } from 'src/app/apuracao-dados-informes-bacen/service/apuracao-dados-informes-bacen.service';
import { ComposicaoOperacaoService } from 'src/app/shared/service/composicao-operacao.service';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { SegService } from '../../services/seg.service';
import { Grupo } from '../../model/grupo';
import { throwError } from 'rxjs';
import * as moment from 'moment';
import { FuncaoSisGrupo } from '../../model/funcaoSisGrupo';
import { GrupoUsuario } from '../../model/grupoUsuario';
import { OperacaoSeg } from '../../model/operacao.enum';

@Component({
  selector: 'app-seg-permissoes-usuario',
  templateUrl: './seg-permissoes-usuario.component.html',
  styleUrls: ['./seg-permissoes-usuario.component.scss']
})
export class SegPermissoesUsuarioComponent implements OnInit {

  @Input() edit?: Usuario;

  form: FormGroup;
  listaGrupo: Grupo[];
  listaGrupoPermissoes: Grupo[];
  listaGrupoPermissoesSalvar: GrupoUsuario[];

  inserir:OperacaoSeg = OperacaoSeg.Inserir;
  excluir:OperacaoSeg = OperacaoSeg.Excluir;

  constructor(
    private segService: SegService,
    private formBuild: FormBuilder,
    private pixMessageService: PixMessageService,
    private drawerService: DrawerService,
    private composicaoOperacaoService: ComposicaoOperacaoService
  ) {}

  get controls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.listaGrupo = new Array;
    this.listaGrupoPermissoes = new Array;
    this.instanceFormGroupUsuario();
    this.carregarListas();
    //this.loadSistemas();
  }


  remover(grupo: Grupo ){
    if(grupo.operacao == OperacaoSeg.Default){
      grupo.operacao = OperacaoSeg.Excluir;
    }else{
      this.listaGrupoPermissoes.splice(this.listaGrupoPermissoes.findIndex(x => x.id == grupo.id), 1);
      this.listaGrupoPermissoes = [...this.listaGrupoPermissoes];
    }
  }

  desfazer(grupo: Grupo){
    if(grupo.operacao == OperacaoSeg.Excluir){
      grupo.operacao = OperacaoSeg.Default;
    }
  }

  private instanceFormGroupUsuario() {
    this.form = this.formBuild.group({
      usuario: {value: this.edit.nome, disabled:true},
      grupo:{value: null},
    });
  }

  onAddList() {
    var codigoFuncao = this.listaGrupoPermissoes?.find(x => x.id === this.controls.grupo.value)
    if (codigoFuncao !== undefined){
      this.pixMessageService.toastInfo('Esse grupo já foi atribuido ao usuário!');
    }else{
      var grupo = new Grupo;
      grupo  = this.listaGrupo.find(x => x.id === this.controls.grupo.value)
      grupo.operacao = OperacaoSeg.Inserir;
      this.listaGrupoPermissoes.push(grupo);
      this.listaGrupoPermissoes = [...this.listaGrupoPermissoes];
    }

  }

  onSave() {
    const lista = this.listaGrupoPermissoes.filter(x => x.operacao != OperacaoSeg.Default);

    this.segService.atribuirGruposAoUsuario(this.edit.id, lista).subscribe((data) => {
      this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
      this.drawerService.close();
    });

  }

  carregarListas(){
    this.segService.getGrupos().subscribe(data => this.listaGrupo = data)
    this.segService.getGruposUsuario(this.edit.id).subscribe(data => this.listaGrupoPermissoes = data ? data: new Array())
  }


}


