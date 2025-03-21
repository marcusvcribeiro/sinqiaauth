import { AtribuicaoGrupoUsuario } from './../../../model/atribuicaoGrpUsu';
import { AlcadaUsuario } from './../../../model/alcadaUsuario';
import { Grupo } from './../../../../seg/model/grupo';
import { DrawerService } from '@albert/ui';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GrupoUsuario } from 'src/app/cadastros/model/grupoUsuario';
import { AlcadaService } from 'src/app/cadastros/service/alcada.service';
import { map } from 'rxjs/operators';
import Seg from 'src/app/cadastros/model/seg';

@Component({
  selector: 'app-grupos-usuario-adicionar',
  templateUrl: './grupos-usuario-adicionar.component.html',
  styleUrls: ['./grupos-usuario-adicionar.component.scss']
})
export class GruposUsuarioAdicionarComponent implements OnInit {
  @Input() usuario: AlcadaUsuario;
  form: FormGroup;

  gruposUsuario: GrupoUsuario[] = [];

  gruposLista: GrupoUsuario[] = [];

  seg: Seg = new Seg();

  constructor(
    private formBuilder: FormBuilder,
    private alcadaService: AlcadaService,
    private drawerService: DrawerService
  ) { }

  ngOnInit(): void {
    this.instanciarFormulario();
    this.getGruposUsuario();
    this.listarGrupos();
  }

  instanciarFormulario(){
    this.form = this.formBuilder.group({
      usuario: [({value: this.usuario.nomeUsu, disabled: true})],
      grupo: ['']
    })
  }

  get controls() {
    return this.form.controls;
  }

  private getGruposUsuario(){
    this.alcadaService.getGruposUsuario(this.usuario.id).subscribe(v => {
      this.gruposUsuario = v
    })
  }

  private listarGrupos(){
    this.alcadaService.getGrupos().pipe(
      map(grupos => this.gruposLista = grupos))
      .subscribe(_ => this.gruposLista.sort((a, b) => {
        return a.dscGrpUsu < b.dscGrpUsu ? -1 : a.dscGrpUsu > b.dscGrpUsu ? 1 : 0;
      })
    )
  }

  onAdicionarGrupoUsuario(){
    let atribuicaoUsuario = new AtribuicaoGrupoUsuario();
    atribuicaoUsuario.idUsuario = this.usuario.id;
    atribuicaoUsuario.idGrupo = Number(this.controls.grupo.value);
    atribuicaoUsuario.codEmpUsu = 1;

    this.alcadaService.vincularUsuarioGrupo(atribuicaoUsuario).subscribe(() => {
      this.getGruposUsuario();
    })
  }

  onDelete(grupo: GrupoUsuario){
    this.alcadaService.desvincularUsuarioGrupo(this.usuario.id, grupo.idGrpUsu).subscribe(() => {
      this.getGruposUsuario();
    });
  }

  onSave(){
    this.drawerService.close()
  }
}

