import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { DrawerService, ToastService } from '@albert/ui';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ParticipanteIndiretoService } from 'src/app/cadastros/service/participante-indireto.service';
import { ParticipanteIndireto } from '../../../model/participanteIndireto';
import { OperacaoSeg } from '../../../model/operacao.enum';
import Seg from 'src/app/cadastros/model/seg';
import { DateFormatHelper } from '../../../../shared/helper/date-format-helper';

@Component({
  selector: 'app-editar-participante-indireto-form',
  templateUrl: './editar-participante-indireto-form.component.html',
  styleUrls: ['./editar-participante-indireto-form.component.scss']
})

export class EditarParticipanteIndiretoFormComponent implements OnInit {

  formData: FormGroup;

  @Input() edit?: ParticipanteIndireto;
  @Output() event = new EventEmitter();

  seg: Seg = new Seg();

  constructor(
    private formBuild: FormBuilder,
    private drawerService: DrawerService,
    private ParticipanteIndiretoService: ParticipanteIndiretoService,
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
    this.controls.entidadeParticipante.setValue(this.edit?.idEntPar);
    this.controls.sistema.setValue(this.edit?.codSisPar);
  }

  private instanceFormGroupForGrupo() {
    this.formData = this.formBuild.group({
      entidadeParticipante: [this.isInsert ? "" : this.edit?.idEntPar, Validators.required],
      situacao: [this.isInsert ? "" : this.edit?.idEstOpe, Validators.required],
      dataInicio: [this.isInsert ? "" : this.edit?.datIniOpe, Validators.required],
      sistema: [this.isInsert ? "" : this.edit?.codSisPar, Validators.required],
    });
  }

  onEditarParticipanteIndireto() {
    let indireto = new ParticipanteIndireto();
    indireto.idEntPar = Number(this.controls.entidadeParticipante.value);
    indireto.idEstOpe = this.controls.situacao.value;
    indireto.datIniOpe = DateFormatHelper.toUrlDateTime(this.controls.dataInicio.value);
    indireto.codSisPar = Number(this.controls.sistema.value);

    this.ParticipanteIndiretoService.atualizarParticipanteIndireto(indireto, this.edit.idEntPar).subscribe(() =>{
      this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
      this.drawerService.close();
      this.event.emit();
    });
  }

  // keyPress(event: any) {
  //   const pattern = /[0-9\+\-\ ]/;

  //   let inputChar = String.fromCharCode(event.charCode);
  //   if (event.keyCode != 8 && !pattern.test(inputChar)) {
  //     event.preventDefault();
  //   }
  // }
}
