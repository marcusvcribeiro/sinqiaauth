import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OperacaoEnum } from 'src/app/seg/enum/operacaoEnum';
import { Operacao } from 'src/app/shared/model/enum/operacao';
import { ContatoUsuarioRecebedor } from './../../model/ContatoUsuarioRecebedor';

@Component({
  selector: 'app-usuario-recebedor-contatos',
  templateUrl: './usuario-recebedor-contatos.component.html',
  styleUrls: ['./usuario-recebedor-contatos.component.scss']
})
export class UsuarioRecebedorContatosComponent implements OnInit {

  formContato?: FormGroup;
  @Input() contatos?: ContatoUsuarioRecebedor[];
  @Input() formData?: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  inserir() {
    const data: ContatoUsuarioRecebedor = new ContatoUsuarioRecebedor(
      this.formContato.controls.nome.value, this.formContato.controls.email.value, OperacaoEnum.Inclusao
    );

    this.contatos.push(data);
    this.formData.controls.contatos.setValue(this.formData.controls.contatos.value + 1);
    this.formContato.reset();
  }

  remover(contato: ContatoUsuarioRecebedor) {
    this.formData.controls.contatos.setValue(this.formData.controls.contatos.value - 1);

    if (contato.operacao === OperacaoEnum.Inclusao) {
      this.contatos.splice(this.contatos.indexOf(contato));
      return;
    }

    contato.operacao = OperacaoEnum.Exclusao;
  }

  desfazer(contato: ContatoUsuarioRecebedor) {
    if (contato.operacao === OperacaoEnum.Exclusao) {
      contato.operacao = OperacaoEnum.Default;
      this.formData.controls.contatos.setValue(this.formData.controls.contatos.value + 1);
    }
  }

  private criarFormulario() {
    this.formContato = this.fb.group({
      nome: ['', Validators.required],
      email: ['',  [Validators.required, Validators.email, Validators.pattern(/^[a-z0-9.]+@[a-z0-9\-]+\.[a-z]+\.?([a-z]+)?$/i)]]
    });
  }

}
