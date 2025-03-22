import { AlcadaService } from 'src/app/cadastros/service/alcada.service';
import { DrawerService } from '@albert/ui';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { AssociacaoAlcadaGrpUsuService } from './../../../service/associacao-alcada-grp-usu.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AssociacaoAlcadaGrupoUsuario } from 'src/app/cadastros/model/associacaoAlcadaGrpUsuario';
import { GrupoUsuario } from 'src/app/cadastros/model/grupoUsuario';
import Seg from 'src/app/cadastros/model/seg';

@Component({
  selector: 'app-associacao-editar',
  templateUrl: './associacao-editar.component.html',
  styleUrls: ['./associacao-editar.component.scss']
})
export class AssociacaoEditarComponent implements OnInit {
  formData: FormGroup;
  gruposList: GrupoUsuario[];

  seg: Seg = new Seg();

  @Input() edit?: AssociacaoAlcadaGrupoUsuario;
  @Output() event = new EventEmitter();

  constructor(
    private associacaoAlcadaGrpUsuService: AssociacaoAlcadaGrpUsuService,
    private pixMessageService: PixMessageService,
    private drawerService: DrawerService,
    private formBuilder: FormBuilder,
    private alcadaService: AlcadaService) { }

  ngOnInit(): void {
    this.instanciarForm();
    this.listarGrupos();
  }

  private instanciarForm() {
    this.formData = this.formBuilder.group({
      grupo: ["", Validators.required],
      valor: ["", Validators.required]
    });
  }

  private listarGrupos(){
    this.alcadaService.getGrupos().subscribe(grupos => this.gruposList = grupos)
  }

  get controls() {
    return this.formData.controls;
  }

  get isInsert() {
    return this.edit == undefined && this.edit == null;
  }

  onSalvar(){
    let params = this.gerarParametros();

    const associacaoBody = new AssociacaoAlcadaGrupoUsuario();
    associacaoBody.idGrpUsu = this.controls.grupo.value;
    associacaoBody.vrLimOpe = this.controls.valor.value;

    this.associacaoAlcadaGrpUsuService.editarAssociacao(params, associacaoBody).subscribe(() =>{
      this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
      this.drawerService.close();
      this.event.emit();
    })
  }

  gerarParametros(){
    const associacaoEdit = new AssociacaoAlcadaGrupoUsuario();
    //idGrupo anterior
    associacaoEdit.idGrpUsu = this.edit.idGrpUsu;
    associacaoEdit.codEmpPar = this.edit.codEmpPar;
    associacaoEdit.codSisPar = this.edit.codSisPar;
    associacaoEdit.codPrdPar = this.edit.codPrdPar;
    associacaoEdit.codOpeBanPar = this.edit.codOpeBanPar;
    associacaoEdit.idLiqPar = this.edit.idLiqPar;
    associacaoEdit.numComOpe = this.edit.numComOpe;
    associacaoEdit.idAcaAlcOpe = this.edit.idAcaAlcOpe;

    return associacaoEdit;
  }
}
