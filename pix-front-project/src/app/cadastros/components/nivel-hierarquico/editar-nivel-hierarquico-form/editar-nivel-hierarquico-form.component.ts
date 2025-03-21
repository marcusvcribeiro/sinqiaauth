import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { TranslateService } from '@ngx-translate/core';
import { DrawerService, ToastService } from '@albert/ui';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NivelHierarquico } from 'src/app/cadastros/model/nivelHierarquico';
import { NivelHierarquicoService } from 'src/app/cadastros/service/nivel-hierarquico.service';
import Seg from 'src/app/cadastros/model/seg';

@Component({
  selector: 'app-editar-nivel-hierarquico-form',
  templateUrl: './editar-nivel-hierarquico-form.component.html',
  styleUrls: ['./editar-nivel-hierarquico-form.component.scss']
})
export class EditarNivelHierarquicoFormComponent implements OnInit {

  formData: FormGroup;

  @Input() edit?: NivelHierarquico;
  @Output() event = new EventEmitter();

  seg: Seg = new Seg();

  constructor(
    private formBuild: FormBuilder,
    private drawerService: DrawerService,
    private nivelHierarquicoService: NivelHierarquicoService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private pixMessageService: PixMessageService) { }

  get controls() {
    return this.formData.controls;
  }

  get isInsert() {
    return this.edit == undefined && this.edit == null;
  }

  ngOnInit(): void {
    this.instanceFormGroupForGrupo();
  }

  private instanceFormGroupForGrupo() {
    this.formData = this.formBuild.group({
      nivel: [this.isInsert ? "" : this.edit?.vrNivHie, Validators.required]
    });
  }

  editarNivelHierarquico() {
    let nivelH = new NivelHierarquico();
    nivelH.vrNivHie = Number(this.controls.nivel.value);
    nivelH.datUltMnt = new Date().toISOString();

    if(nivelH.vrNivHie % 10 !== 0){
      this.toastService.create({
        type: 'error',
        text: this.translateService.instant('validacoes.valorMultiploDe10'),
      });
      return;
    }

    this.nivelHierarquicoService.atualizarNivelHierarquico(nivelH, this.edit.codNivHie).subscribe(() =>{
      this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
      this.drawerService.close();
      this.event.emit();
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
