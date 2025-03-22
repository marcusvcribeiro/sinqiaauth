import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioRecebedorService } from './../../service/usuario-recebedor.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsuarioRecebedor } from './../../model/UsuarioRecebedor';
import { DrawerService } from '@albert/ui';

@Component({
  selector: 'app-usuario-recebedor-drawer',
  templateUrl: './usuario-recebedor-drawer.component.html',
  styleUrls: ['./usuario-recebedor-drawer.component.scss']
})
export class UsuarioRecebedorDrawerComponent implements OnInit {

  @Input() usuarioRecebedor?: UsuarioRecebedor;
  formData?: FormGroup;

  titulo: string;

  constructor(private usuarioRecebedorService: UsuarioRecebedorService, private translateService: TranslateService,
    private formBuilder: FormBuilder, private drawerService: DrawerService) { }

  get isNew() {
    return this.usuarioRecebedor?.id == null || this.usuarioRecebedor?.id === 0;
  }

  ngOnInit(): void {
    this.criarFormulario();
  }

  private criarFormulario() {
    this.formData = this.formBuilder.group({
      id: [],
      nome: [this.isNew ? null : this.usuarioRecebedor?.nome, Validators.required],
      contatos: [this.isNew ? 0 : this.usuarioRecebedor?.contatos.length, Validators.min(1)],
      sistema: [this.isNew ? null : this.usuarioRecebedor?.sistema, Validators.required],
      situacaoUsuario: [this.isNew ? true : this.usuarioRecebedor?.situacao]
    });

    if (this.isNew) {
      this.usuarioRecebedor = new UsuarioRecebedor();
      this.usuarioRecebedor.contatos = [];
      this.usuarioRecebedor.donos = [];
    }
  }

  salvar() {

    this.usuarioRecebedor.nome = this.formData.controls.nome.value;
    this.usuarioRecebedor.sistema = this.formData.controls.sistema.value;
    this.usuarioRecebedor.situacao = this.formData.controls.situacaoUsuario.value;

    if (this.isNew) {

      this.usuarioRecebedorService.criar(this.usuarioRecebedor).subscribe(() => {
        this.drawerService.close();
      });

    } else {

      this.usuarioRecebedorService.atualizar(this.usuarioRecebedor.id, this.usuarioRecebedor).subscribe(() => {
        this.drawerService.close();
      });

    }


  }

}
