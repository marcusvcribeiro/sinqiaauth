import { TranslateService } from '@ngx-translate/core';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { AtribuicaoGrupoUsuario } from './../../../model/atribuicaoGrpUsu';
import { AlcadaUsuario } from './../../../model/alcadaUsuario';
import { DrawerService, ToastService } from '@albert/ui';
import { AlcadaService } from 'src/app/cadastros/service/alcada.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GrupoUsuario } from 'src/app/cadastros/model/grupoUsuario';
import { Component, Input, OnInit } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import Seg from 'src/app/cadastros/model/seg';

@Component({
  selector: 'app-usuarios-grupo-adicionar',
  templateUrl: './usuarios-grupo-adicionar.component.html',
  styleUrls: ['./usuarios-grupo-adicionar.component.scss']
})
export class UsuariosGrupoAdicionarComponent implements OnInit {
  @Input() grupo: GrupoUsuario;
  form: FormGroup;

  usuariosGrupo: AlcadaUsuario[] = [];

  usuariosLista: AlcadaUsuario[] = [];

  seg: Seg = new Seg();

  constructor(
    private formBuilder: FormBuilder,
    private alcadaService: AlcadaService,
    private drawerService: DrawerService,
    private pixMessageService: PixMessageService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.instanciarFormulario();
    this.getUsuariosGrupo();
    this.listarUsuarios();
  }

  instanciarFormulario(){
    this.form = this.formBuilder.group({
      nomeGrp: [this.grupo.dscGrpUsu],
      situacaoGrp: [this.grupo.codSitOpe],
      user: ['', Validators.required]
    })
  }

  get controls() {
    return this.form.controls;
  }

  private getUsuariosGrupo(){
    this.alcadaService.getUsuariosGrupo(this.grupo.idGrpUsu).subscribe(v => {
      this.usuariosGrupo = v
    })
  }

  private listarUsuarios(){
    this.alcadaService.getUsuarios().pipe(
      map(usuarios => this.usuariosLista = usuarios))
      //ordenando lista de usuarios
      .subscribe(_ => this.usuariosLista.sort((a, b) =>{
        return a.nomeUsu < b.nomeUsu ? -1 : a.nomeUsu > b.nomeUsu ? 1 : 0;
      }),
      (e) => console.log(e));
  }

  onAdicionarUsuario(){
    let atribuicaoUsuario = new AtribuicaoGrupoUsuario();
    atribuicaoUsuario.idGrupo = this.grupo.idGrpUsu;
    atribuicaoUsuario.idUsuario = Number(this.controls.user.value);
    atribuicaoUsuario.codEmpUsu = 1;

    this.alcadaService.vincularUsuarioGrupo(atribuicaoUsuario).subscribe(() => {
      this.getUsuariosGrupo();
    })
  }

  onDelete(usuario: AlcadaUsuario){
    this.alcadaService.desvincularUsuarioGrupo(usuario.id, this.grupo.idGrpUsu).subscribe(() =>{
      this.getUsuariosGrupo();
    });
  }

  onSave(){
    this.drawerService.close()
  }
}
