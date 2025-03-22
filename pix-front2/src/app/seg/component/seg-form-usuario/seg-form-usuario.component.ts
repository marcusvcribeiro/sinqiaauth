import { Usuario } from './../../model/usuario';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DrawerService } from '@albert/ui';
import { ComposicaoOperacaoService } from 'src/app/shared/service/composicao-operacao.service';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { DictChaveInclusaoEnum } from 'src/app/apuracao-dados-informes-bacen/enum/dict-chave-inclusao.enum';
import { PixDetalheTransacaoEnum } from 'src/app/apuracao-dados-informes-bacen/enum/pix-detalhe-transacao.enum';
import { SegService } from '../../services/seg.service';
import * as moment from 'moment';
import { OperacaoSeg } from '../../model/operacao.enum';

@Component({
  selector: 'app-seg-form-usuario',
  templateUrl: './seg-form-usuario.component.html',
  styleUrls: ['./seg-form-usuario.component.scss']
})
export class SegFormUsuarioComponent implements OnInit {

  @Input() edit?: Usuario;
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
  ]

  statusListaAutenticacao: any[] = [
    {
      'label': 'Ativo',
      'value': 'A'
    },
    {
      'label': 'Inativo',
      'value': 'I'
    }
  ]


  get isInsert(){
    return this.edit == undefined && this.edit == null;
  }


  form: FormGroup;

  constructor(
    private formBuild: FormBuilder,
    private pixMessageService: PixMessageService,
    private drawerService: DrawerService,
    private segService: SegService
  ) { }

  get controls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.instanceFormGroupForUsuario();
    this.carregarListas();
  }

  public val: string;









  private instanceFormGroupForUsuario() {
    this.form = this.formBuild.group({
      nome: [this.isInsert? '' : this.edit?.nome, Validators.required],
      login: [this.isInsert? '' : this.edit?.login, Validators.required],
      status: [this.isInsert? null: this.edit?.situacao, Validators.required],
      autenticacao : [this.isInsert ? true : this.edit?.autenticacao, Validators.required],
      statusAutenticacao: [this.isInsert? "I": this.edit?.statusAutenticacao],
      email: [this.isInsert? '' : this.edit?.email],
      resetarSenha: [this.isInsert ? true : this.edit?.resetarSenha]
    });
  }


  onSave() {

    var usuario = new Usuario();
    if (this.isInsert) {
      usuario.operacao = OperacaoSeg.Inserir;
    } else {
      usuario.id = this.edit?.id;
      usuario.operacao = OperacaoSeg.Atualizar;
    }
    usuario.nome = this.controls.nome.value;
    usuario.email = this.controls.email.value;
    usuario.login = this.controls.login.value;
    usuario.situacao = this.controls.status.value;
    usuario.resetarSenha = this.controls.resetarSenha.value;
    usuario.autenticacao = this.controls.autenticacao.value;
    usuario.statusAutenticacao = this.edit?.statusAutenticacao;

    this.segService.salvarUsuario(usuario).subscribe((data) => {
      this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
      this.drawerService.close();
      this.event.emit();
    });
  }

  private carregarListas() {

  }
}
