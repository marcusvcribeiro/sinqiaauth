import { CertificadoDigitalContato } from 'src/app/shared/model/certificado-digital-contato';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OperacaoEnum } from 'src/app/seg/enum/operacaoEnum';
import { DrawerService } from '@albert/ui';
import { ConfiguracaoService } from '../../service/configuracao.service';
import Seg from './../../model/seg'
import { PixMessageService } from './../../../shared/service/pix-message-service';

@Component({
  selector: 'app-certificado-digital-contato',
  templateUrl: './certificado-digital-contato.component.html',
  styleUrls: ['./certificado-digital-contato.component.scss']
})
export class CertificadoDigitalContatoComponent implements OnInit  {

  constructor(private fb: FormBuilder,
    private drawerService: DrawerService,
    private configuracaoService: ConfiguracaoService,
    private pixMessageService: PixMessageService) { }

  form: FormGroup;
  seg: Seg = new Seg();
  contatos: CertificadoDigitalContato[];


  ngOnInit(): void {
    this.criarFormulario();
    this.loadContatos();
  }

  loadContatos(){
    this.configuracaoService.listarCertificadoigitalContato().subscribe(data => this.contatos = data);
    }

  inserir() {
    const data: CertificadoDigitalContato = new CertificadoDigitalContato(
      this.form.controls.nome.value, this.form.controls.email.value, OperacaoEnum.Inclusao
    );

    this.contatos.push(data);
    this.form.reset();
  }

  remover(contato: CertificadoDigitalContato) {
    if (contato.operacao === OperacaoEnum.Inclusao) {
      this.contatos.splice(this.contatos.indexOf(contato));
      return;
    }

    contato.operacao = OperacaoEnum.Exclusao;
  }

  desfazer(contato: CertificadoDigitalContato) {
    if (contato.operacao === OperacaoEnum.Exclusao) {
      contato.operacao = OperacaoEnum.Default;
    }
  }

  onSave() {
    this.configuracaoService.atualizaCertificadoDigitalContato(this.contatos)
    .subscribe(() => {
      this.drawerService.close();
      this.pixMessageService.toastSuccess("Email atualizados com sucesso");
    });
  }

  private criarFormulario() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['',  [Validators.required, Validators.email, Validators.pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i)]]
    });
  }

}
