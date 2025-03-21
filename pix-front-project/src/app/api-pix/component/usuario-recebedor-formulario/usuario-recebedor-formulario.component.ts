import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DictService } from 'src/app/dict/service/dict.service';
import { TranslateService } from '@ngx-translate/core';
import { Sistema } from 'src/app/shared/model/sistema';
import { ComposicaoOperacaoService } from 'src/app/shared/service/composicao-operacao.service';
import { DonoChave } from './../../../shared/model/dono-chave-pix';
import { DrawerService } from '@albert/ui';
import { UsuarioRecebedorEnderecoComponent } from './../usuario-recebedor-endereco/usuario-recebedor-endereco.component';
import { OperacaoEnum } from 'src/app/seg/enum/operacaoEnum';


@Component({
  selector: 'app-usuario-recebedor-formulario',
  templateUrl: './usuario-recebedor-formulario.component.html',
  styleUrls: ['./usuario-recebedor-formulario.component.scss']
})
export class UsuarioRecebedorFormularioComponent implements OnInit {

  @Input() formData!: FormGroup;
  @Input() isNew: boolean = true;
  @Input() donosToTable: DonoChave[];
  @Input() usuRec?: number;

  donos: DonoChave[] = new Array();
  sistemas: Sistema[] = new Array();

  procurandoCnpj = false;
  sucessoBuscaCnpj = false;
  mensagemCnpj = '';

  formDono: FormGroup;

  get controls() {
    return this.formData?.controls;
  }

  get donoInvalido() {
    return this.formDono?.controls.idDono?.invalid;
  }

  get donoJaCadastrado() {
    const dono = this.formDono?.controls.idDono?.value;
    let existe = false;
    this.donosToTable.forEach(element => {
      if (element.idDono === dono) {
        existe = true;
      }
    });
    return existe;
  }

  constructor(private dictService: DictService, private translateService: TranslateService,
    private composicaoOperacaoService: ComposicaoOperacaoService, private builder: FormBuilder,
    private drawerService: DrawerService) { }

  ngOnInit(): void {
    this.gerarFormulario();
    this.loadSistemas();
    this.loadDonos();
  }

  private gerarFormulario() {
    this.formDono = this.builder.group({
      idDono: [null, Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: [null, Validators.required],
    });
  }

  mudouDono() {
    this.formDono.controls.cep.reset();
    this.formDono.controls.logradouro.reset();
    this.formDono.controls.cidade.reset();
    this.formDono.controls.estado.reset();
  }

  private loadSistemas() {
    this.composicaoOperacaoService.listarSistema().subscribe((data) => {
      this.sistemas = data;
    });
  }

  private loadDonos() {
    this.dictService.listarDonos().subscribe(donos => this.donos = donos);
  }

  adicionarDono() {
    var dono = new DonoChave();
    dono.idDono = this.formDono?.controls.idDono.value;
    dono.nome = this.donos.find(e => e.idDono === dono.idDono).nome;
    dono.cep = this.formDono?.controls.cep.value.replace('-', '').replace('.', '');
    dono.logradouro = this.formDono?.controls.logradouro.value;
    dono.cidade = this.formDono?.controls.cidade.value;
    dono.estado = this.formDono?.controls.estado.value;
    dono.operacao = OperacaoEnum.Inclusao;

    this.donosToTable.push(dono);
    this.formDono.reset();
  }

  async adicionarEndereco() {
    const { drawerComponent } = await this.drawerService.create({
      component: UsuarioRecebedorEnderecoComponent,
      title: this.translateService.instant(`titulo.endereco_dono`),
      size: 'small',
      componentProps: { formulario: this.formDono, isNew: true }
    });

    drawerComponent.instance.close.subscribe(() => {

    });
  }



}
