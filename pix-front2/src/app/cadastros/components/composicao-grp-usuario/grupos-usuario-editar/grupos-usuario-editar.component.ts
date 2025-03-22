import { AlcadaService } from 'src/app/cadastros/service/alcada.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GrupoUsuario } from 'src/app/cadastros/model/grupoUsuario';
import { NivelHierarquico } from 'src/app/cadastros/model/nivelHierarquico';
import { NivelHierarquicoService } from 'src/app/cadastros/service/nivel-hierarquico.service';
import { DrawerService, DialogService } from '@albert/ui';
import Seg from 'src/app/cadastros/model/seg';

@Component({
  selector: 'app-grupos-usuario-editar',
  templateUrl: './grupos-usuario-editar.component.html',
  styleUrls: ['./grupos-usuario-editar.component.scss']
})
export class GruposUsuarioEditarComponent implements OnInit {

  formData: FormGroup;

  @Input() edit?: GrupoUsuario;
  @Output() event = new EventEmitter();

  seg: Seg = new Seg();

  constructor(
    private formBuild: FormBuilder,
    private drawerService: DrawerService,
    private dialogService: DialogService,
    private alcadaService: AlcadaService,
    private nivelHierarquicoService: NivelHierarquicoService) { }

  niveisHierarquicosList: NivelHierarquico[] = [];

  get controls() {
    return this.formData.controls;
  }

  get isInsert() {
    return this.edit == undefined && this.edit == null;
  }

  ngOnInit(): void {
    this.instanceFormGroupForGrupo();
    this.listarNiveisHierarquicos();
  }

  private instanceFormGroupForGrupo() {
    this.formData = this.formBuild.group({
      identificacao: [this.isInsert ? "" : this.edit?.idGrpUsu],
      nome: [this.isInsert ? "" : this.edit?.dscGrpUsu, Validators.required],
      descricao: [this.isInsert ? "" : this.edit?.dscFunGrpUsu, Validators.required],
      consulta: [this.edit?.flgPemCsuIrr === 'S' ? true : false],
      nivelHierarquico: [this.isInsert ? "" : this.edit?.codNivHie, Validators.required],
      situacao: [this.isInsert ? "" : this.edit?.codSitOpe, Validators.required],
    });
  }

  private listarNiveisHierarquicos(){
    this.nivelHierarquicoService.listarNivelHierarquico().subscribe(niveis => this.niveisHierarquicosList = niveis);
  }

  onSave(){
    let grupoUsuario = new GrupoUsuario();
    grupoUsuario.datUltMnt = new Date().toISOString();
    grupoUsuario.codNivHie = this.controls.nivelHierarquico.value;
    grupoUsuario.dscGrpUsu = this.controls.nome.value;
    grupoUsuario.codSitOpe = this.controls.situacao.value;
    grupoUsuario.flgPemCsuIrr = this.controls.consulta.value === true ? 'S' : 'N';
    grupoUsuario.codUsuUltMnt = 0;
    grupoUsuario.dscFunGrpUsu = this.controls.descricao.value;

    this.alcadaService.editarGrupo(grupoUsuario, this.edit.idGrpUsu).subscribe(() =>{
      this.drawerService.close();
      this.event.emit();
    })
  }
}
