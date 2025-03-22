import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DrawerService, DialogService } from '@albert/ui';
import { UsuarioRecebedorService } from './../../service/usuario-recebedor.service';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { Credencial } from '../../model/Credencial';
import { UsuRecSelectContatosComponent } from './../usu-rec-select-contatos/usu-rec-select-contatos.component';
import { ContatoUsuarioRecebedor } from './../../model/ContatoUsuarioRecebedor';
import { TranslateService } from '@ngx-translate/core';
import { UsuRecSelectEscoposComponent } from './../usu-rec-select-escopos/usu-rec-select-escopos.component';
import Seg from '../../model/Seg';

@Component({
  selector: 'app-usuario-recebedor-credenciais',
  templateUrl: './usuario-recebedor-credenciais.component.html',
  styleUrls: ['./usuario-recebedor-credenciais.component.scss']
})
export class UsuarioRecebedorCredenciaisComponent implements OnInit {

  @Input() contatos: ContatoUsuarioRecebedor[] = [];
  @Input() usuRec: number;
  seg: Seg = new Seg();
  formData: FormGroup;
  credenciais: Credencial[] = [];

  constructor(private fb: FormBuilder, private drawerService: DrawerService, private translateService: TranslateService,
    private dialogService: DialogService,
    private usuRecService: UsuarioRecebedorService, private pixMessageService: PixMessageService) { }

  ngOnInit(): void {
    this.loadFormulario();
    this.loadCredenciais();
  }

  private loadCredenciais() {
    this.usuRecService.obterCredenciais(this.usuRec)
      .subscribe(data => { this.credenciais = data; });
  }

  loadFormulario() {
    this.formData = this.fb.group({
      clientId: ['', [Validators.required, Validators.pattern(/^[A-Z0-9.]*/i)]]
    });
  }

  inserir() {
    this.usuRecService.gerarCredenciais(this.usuRec, this.formData.controls.clientId.value)
      .subscribe(() => {
        this.loadCredenciais();
        this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
        this.formData.reset();
      });
  }

  async openContatos(credencial: Credencial) {
    this.contatos.forEach(contato => {
      contato.clientId = credencial.clientId;
      contato.selecionado = false;

      credencial.contatos.forEach(c => {
        if (c.id === contato.id) {
          contato.selecionado = true;
        }
      });
    });



    const { drawerComponent } = await this.drawerService.create({
      component: UsuRecSelectContatosComponent,
      size: 'small',
      title: credencial.clientId,
      componentProps: {
        contatos: this.contatos,
        idUsuRec: this.usuRec
      }
    });

    drawerComponent.instance.close.subscribe(() => {
      this.loadCredenciais();
    });
  }

  enviarEmail(credencial: Credencial) {
    if (credencial.contatos.length > 0) {
      this.usuRecService.reenviarCredenciais(this.usuRec, credencial.clientId).subscribe(() => {
        this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
      });
    } else {
      this.pixMessageService.toastInfo('validacoes.cadastrar_contato');
    }
  }

  novoSecret(credencial: Credencial) {

      this.usuRecService.novoSecret(this.usuRec, credencial.clientId).subscribe(() => {
        this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
      });

  }

  async openEscopos(credencial: Credencial) {
    const { drawerComponent } = await this.drawerService.create({
      component: UsuRecSelectEscoposComponent,
      size: 'small',
      title: credencial.clientId,
      componentProps: {
        clientId: credencial.clientId, usuRec: this.usuRec,
      }
    });

    drawerComponent.instance.close.subscribe(() => {
    });
  }

  remover(credencial: Credencial){

    this.dialogService.create({
      type: 'confirm',
      title: this.translateService.instant('titulo.confirmarOperacao'),
      message: this.translateService.instant('mensagem.operacaoDesfeita'),
      btnPrimaryText: this.translateService.instant('campo.sim'),
      btnSecondaryText: this.translateService.instant('campo.nao'),
      callback: () => {
        this.usuRecService.removerCredencial(this.usuRec, credencial.clientId).subscribe(() => {
          this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
          this.loadCredenciais();
        })
      }}
    );


  }

}
