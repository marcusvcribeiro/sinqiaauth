import { DrawerService } from '@albert/ui';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { KeyValue } from 'src/app/shared/model/key-value';
import { UsuarioRecebedorService } from './../../service/usuario-recebedor.service';
import { DonoChave } from 'src/app/shared/model/dono-chave-pix';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';

@Component({
  selector: 'app-usuario-recebedor-endereco',
  templateUrl: './usuario-recebedor-endereco.component.html',
  styleUrls: ['./usuario-recebedor-endereco.component.scss']
})
export class UsuarioRecebedorEnderecoComponent implements OnInit {

  @Input() dono: DonoChave;
  @Input() isNew: boolean;
  estados: KeyValue[] = [];
  formulario: FormGroup;


  constructor(private drawerService: DrawerService, private usuRecService: UsuarioRecebedorService,
    private pixMessageService: PixMessageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadEstados();

    this.formulario = this.formBuilder.group({
      idDono: [this.dono.idDono, Validators.required],
      cep: [this.dono.cep, Validators.required],
      logradouro: [this.dono.logradouro, Validators.required],
      cidade: [this.dono.cidade, Validators.required],
      estado: [this.dono.estado, Validators.required],
      usuRec: [this.dono.idUsuRec]
    });
  }

  salvar() {
    if (this.isNew) {
      this.drawerService.close();
    }
    else if (this.formulario.controls.usuRec.value == null) {
      this.dono.idDono = this.formulario.controls.idDono.value;
      this.dono.cep = this.formulario?.controls?.cep?.value.replace('-', '').replace('.', '');
      this.dono.logradouro = this.formulario.controls.logradouro.value;
      this.dono.cidade = this.formulario.controls.cidade.value;
      this.dono.estado = this.formulario.controls.estado.value;
      this.drawerService.close();
    } else {
      let dono = new DonoChave();
      dono.idUsuRec = this.formulario.controls.usuRec.value;
      dono.idDono = this.formulario.controls.idDono.value;
      dono.cep = this.formulario?.controls?.cep?.value.replace('-', '').replace('.', '');
      dono.logradouro = this.formulario.controls.logradouro.value;
      dono.cidade = this.formulario.controls.cidade.value;
      dono.estado = this.formulario.controls.estado.value;

      this.usuRecService.atualizarEndereco(dono.idUsuRec, dono).subscribe(data => {
        this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
        this.dono.cep = dono.cep;
        this.dono.logradouro = dono.logradouro;
        this.dono.cidade = dono.cidade;
        this.dono.estado = dono.estado;
        this.drawerService.close();
      });


    }

  }

  private loadEstados() {
    this.estados = [];
    this.estados.push(new KeyValue({ descricao: 'Acre', id: 'AC' }));
    this.estados.push(new KeyValue({ descricao: 'Alagoas', id: 'AL' }));
    this.estados.push(new KeyValue({ descricao: 'Amapá', id: 'AP' }));
    this.estados.push(new KeyValue({ descricao: 'Amazonas', id: 'AM' }));
    this.estados.push(new KeyValue({ descricao: 'Bahia', id: 'BA' }));
    this.estados.push(new KeyValue({ descricao: 'Ceará', id: 'CE' }));
    this.estados.push(new KeyValue({ descricao: 'Distrito Federal', id: 'DF' }));
    this.estados.push(new KeyValue({ descricao: 'Espírito Santo', id: 'ES' }));
    this.estados.push(new KeyValue({ descricao: 'Goiás', id: 'GO' }));
    this.estados.push(new KeyValue({ descricao: 'Maranhão', id: 'MA' }));
    this.estados.push(new KeyValue({ descricao: 'Mato Grosso', id: 'MT' }));
    this.estados.push(new KeyValue({ descricao: 'Mato Grosso do Sul', id: 'MS' }));
    this.estados.push(new KeyValue({ descricao: 'Minas Gerais', id: 'MG' }));
    this.estados.push(new KeyValue({ descricao: 'Pará', id: 'PA' }));
    this.estados.push(new KeyValue({ descricao: 'Paraíba', id: 'PB' }));
    this.estados.push(new KeyValue({ descricao: 'Paraná', id: 'PR' }));
    this.estados.push(new KeyValue({ descricao: 'Pernambuco', id: 'PE' }));
    this.estados.push(new KeyValue({ descricao: 'Piauí', id: 'PI' }));
    this.estados.push(new KeyValue({ descricao: 'Rio de Janeiro', id: 'RJ' }));
    this.estados.push(new KeyValue({ descricao: 'Rio Grande do Norte', id: 'RN' }));
    this.estados.push(new KeyValue({ descricao: 'Rio Grande do Sul', id: 'RS' }));
    this.estados.push(new KeyValue({ descricao: 'Rondônia', id: 'RO' }));
    this.estados.push(new KeyValue({ descricao: 'Roraima', id: 'RR' }));
    this.estados.push(new KeyValue({ descricao: 'Santa Catarina', id: 'SC' }));
    this.estados.push(new KeyValue({ descricao: 'São Paulo', id: 'SP' }));
    this.estados.push(new KeyValue({ descricao: 'Sergipe', id: 'SE' }));
    this.estados.push(new KeyValue({ descricao: 'Tocantins', id: 'TO' }));
  }

}
