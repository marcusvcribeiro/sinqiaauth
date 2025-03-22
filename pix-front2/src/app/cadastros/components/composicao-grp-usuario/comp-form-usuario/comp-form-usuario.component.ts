import { DrawerService } from '@albert/ui';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlcadaService } from 'src/app/cadastros/service/alcada.service';
import { Usuario } from 'src/app/seg/model/usuario';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { OperacaoSeg } from '../../../model/operacao.enum';

@Component({
  selector: 'app-comp-form-usuario',
  templateUrl: './comp-form-usuario.component.html',
  styleUrls: ['./comp-form-usuario.component.scss']
})
export class CompFormUsuarioComponent implements OnInit {
  @Input() edit?: any;
  @Output() event = new EventEmitter();

  statusLista: any[] = [
    {
      'label': 'Ativo',
      'value': 'A'
    },
    {
      'label': 'Inativo',
      'value': 'I'
    },
    {
      'label': 'Bloqueado',
      'value': 'B'
    }
  ];

  get isInsert(){
    return this.edit == undefined && this.edit == null;
  }

  form: FormGroup;

  constructor(
    private formBuild: FormBuilder,
    private pixMessageService: PixMessageService,
    private drawerService: DrawerService,
    private alcadaService: AlcadaService
    ) {}

  ngOnInit(): void {
    this.instanceFormGroupForUsuario();
    this.carregarListas();
  }

  get controls() {
    return this.form.controls;
  }

  private instanceFormGroupForUsuario() {
    this.form = this.formBuild.group({
      nome: [this.isInsert ? '' : this.edit?.nome, Validators.required],
      login: [this.isInsert ? '' : this.edit?.login, Validators.required],
      status: [this.isInsert ? '': this.edit?.situacao, Validators.required],
      email: [this.isInsert ? '' : this.edit?.email]
    });
  }

  private carregarListas() {};
}
