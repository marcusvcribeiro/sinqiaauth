import { DrawerService } from '@albert/ui';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { NivelHierarquico } from 'src/app/cadastros/model/nivelHierarquico';
import { GrupoUsuario } from './../../../model/grupoUsuario';
import { OperacaoSeg } from 'src/app/cadastros/model/operacao.enum';

import { NivelHierarquicoService } from './../../../service/nivel-hierarquico.service';
import { AlcadaService } from 'src/app/cadastros/service/alcada.service';
import Seg from 'src/app/cadastros/model/seg';

@Component({
  selector: 'app-grp-usuario-form',
  templateUrl: './grp-usuario-form.component.html',
  styleUrls: ['./grp-usuario-form.component.scss']
})
export class GrpUsuarioFormComponent implements OnInit {

  formData: FormGroup;

  @Input() edit?: GrupoUsuario;
  @Output() event = new EventEmitter();

  seg: Seg = new Seg();

  constructor(private formBuild: FormBuilder,
              private nivelHierarquicoService: NivelHierarquicoService,
              private alcadaService: AlcadaService,
              private drawerService: DrawerService) { }

  niveisHierarquicosList: NivelHierarquico[] = [];

  ngOnInit(): void {
    this.instanceFormGroupForGrupo();
    this.listarNiveisHierarquicos();
  }

  get controls() {
    return this.formData.controls;
  }

  get isInsert() {
    return this.edit == undefined && this.edit == null;
  }

  private listarNiveisHierarquicos(){
    this.nivelHierarquicoService.listarNivelHierarquico().subscribe(niveis => this.niveisHierarquicosList = niveis);
  }

  private instanceFormGroupForGrupo() {
    this.formData = this.formBuild.group({
      nome: ["", Validators.required],
      descricao: ["", Validators.required],
      consulta: [true],
      nivelHierarquico: ["", Validators.required],
      situacao: ["", Validators.required],
    });
  }

  onSave() {
    let grupoUsuario = new GrupoUsuario();
    grupoUsuario.codNivHie = this.controls.nivelHierarquico.value;
    grupoUsuario.dscGrpUsu = this.controls.nome.value;
    grupoUsuario.codSitOpe = this.controls.situacao.value;
    grupoUsuario.flgPemCsuIrr = this.controls.consulta.value === true ? 'S' : 'N';
    grupoUsuario.codUsuUltMnt = 0;
    grupoUsuario.dscFunGrpUsu = this.controls.descricao.value;
    grupoUsuario.datUltMnt = new Date().toISOString();

    this.alcadaService.novoGrupo(grupoUsuario).subscribe(() =>{
      this.drawerService.close();
      this.event.emit();
    })
  }
}
