import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DrawerService } from '@albert/ui';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { SegService } from '../../services/seg.service';
import { HistoricoAlteracaoUsuario } from '../../model/historicoAlteracaoUsuario';

@Component({
  selector: 'app-seg-form-alteracao-usuario',
  templateUrl: './seg-form-view-alteracoes-usuario.component.html',
  styleUrls: ['./seg-form-view-alteracoes-usuario.component.scss']
})
export class SegFormAlteracaoUsuarioComponent implements OnInit {

  @Input() edit?: HistoricoAlteracaoUsuario;
  @Output() event = new EventEmitter();

  get isInsert(){
    return false;
  }

  DataReferencia: Date;


  form: FormGroup;

  constructor(
    private formBuild: FormBuilder
  ) { }

  get controls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.DataReferencia = this.edit?.dataHoraInclusao;
    this.instanceFormGroupForUsuario();
  }

  private instanceFormGroupForUsuario() {
    this.form = this.formBuild.group({
      nomeAplicacao: [this.edit?.nomeAplicacao],
      nomeUsuario: [this.edit?.nomeUsuario],
      dataInclusao: [this.edit?.dataHoraInclusao],
      descricaoOperacao : [this.edit?.descricaoOperacao]
    });
  }

}
