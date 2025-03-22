import { Component, Input, OnChanges, OnInit, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CertificadoDigitalDrawerComponent } from 'src/app/certificado-digital/component/certificado-digital-drawer/certificado-digital-drawer.component';
import { UsuarioRecebedor } from '../../model/UsuarioRecebedor';
import { UsuarioRecebedorService } from './../../service/usuario-recebedor.service';
import { DialogService, DrawerService } from '@albert/ui';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioRecebedorDrawerComponent } from './../usuario-recebedor-drawer/usuario-recebedor-drawer.component';
import { CertificadoDigitalService } from 'src/app/certificado-digital/service/certificado-digital.service';
import Seg from '../../model/Seg';
import { UsuarioRecebedorCredenciaisComponent } from '../usuario-recebedor-credenciais/usuario-recebedor-credenciais.component';
import { PreferenciaUsuarioService } from 'src/app/shared/service/preferencia-usuario.service';
import { SituacaoCertificadoUsuarioRecebedorEnum } from '../../enum/SituacaoCertificadoUsuarioRecebedorEnum';

@Component({
  selector: 'app-usuario-recebedor-lista',
  templateUrl: './usuario-recebedor-lista.component.html',
  styleUrls: ['./usuario-recebedor-lista.component.scss']
})
export class UsuarioRecebedorListaComponent implements OnInit, OnChanges {

  @Input() filtro: any;
  @Output() notifica: EventEmitter<UsuarioRecebedor[]> = new EventEmitter();
  seg: Seg = new Seg();
  SemCertificado: SituacaoCertificadoUsuarioRecebedorEnum = SituacaoCertificadoUsuarioRecebedorEnum.SemCertificado;
  CertificadoCriado: SituacaoCertificadoUsuarioRecebedorEnum = SituacaoCertificadoUsuarioRecebedorEnum.CertificadoCriado;

  values: UsuarioRecebedor[] = [];
  filtroForm: FormGroup;
  listaQuantidadeLinhas: number[];
  numeroLinhas: number;
  certificadora: string;

  constructor(private usuarioRecebedorService: UsuarioRecebedorService,
    private formBuild: FormBuilder, private drawerService: DrawerService, private pixMessage: PixMessageService,
    private translateService: TranslateService, private certificadoService: CertificadoDigitalService,
    private preferenciasUsuario: PreferenciaUsuarioService,
    private pixMessageService: PixMessageService,
    private dialogService: DialogService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refresh();
  }

  ngOnInit(): void {
    this.criarFiltro();
    this.criarDataSource();
    this.getCertificadora();
    this.numeroLinhas = this.preferenciasUsuario.numeroLinhasPagina;
    this.listaQuantidadeLinhas = this.preferenciasUsuario.listaLinhaPreferenciaUsuario;
  }

  private getCertificadora() {
    // this.certificadoService
      //.getCertificadoraDigitalHabilitadaApiPix()
      //.subscribe((value) => {
       // this.certificadora = value.nome;
      //});
      this.certificadora = "Aguardando HSBC";
  }

  async editar(usuario: UsuarioRecebedor) {

    this.usuarioRecebedorService.obterUm(usuario.id).subscribe(async usuarioRecebedor => {
      const { drawerComponent } = await this.drawerService.create({
        component: UsuarioRecebedorDrawerComponent,
        size: 'large',
        title: this.translateService.instant('titulo.editar') + ` ${usuario.nome}`,
        componentProps: {
          usuarioRecebedor
        }
      });

      drawerComponent.instance.close.subscribe(() => {
        this.refresh();
      });
    });
  }

  async excluir(usuario: UsuarioRecebedor) {

    this.dialogService.create({
      type: 'confirm',
      title: this.translateService.instant('titulo.confirmarOperacao'),
      message: this.translateService.instant('mensagem.operacaoDesfeita'),
      btnPrimaryText: this.translateService.instant('campo.sim'),
      btnSecondaryText: this.translateService.instant('campo.nao'),
      callback: () => {

        usuario.situacao = false;

        this.usuarioRecebedorService.atualizar(usuario.id, usuario).subscribe(() => {
          this.refresh();
        });
      }
    }
    );

  }

  gerar_certificado(usuario: UsuarioRecebedor) {
    if (this.certificadora === "Sinqia") {
      this.dialogService.create({
        type: "confirm",
        title: this.translateService.instant("titulo.confirmarGerCertificado"),
        message: this.translateService.instant(
          "mensagem.operacaoGerarCertificado"
        ),
        btnPrimaryText: this.translateService.instant("campo.ok"),
        btnSecondaryText: this.translateService.instant("campo.cancelar"),
        callback: () => {
          this.gerarCertificado(usuario);
        },
      });
    }else{
      this.gerarCertificado(usuario);
    }
  }

  private gerarCertificado(usuario: UsuarioRecebedor) {
    const original = usuario.situacaoCertificado;
    usuario.situacaoCertificado = null;
    this.certificadoService.gerarCertificadoApiPix(usuario.id).subscribe(
      () => {
        this.pixMessageService.toastSuccess("mensagem.operacaoSucesso");
        this.refresh();
      },
      () => {
        usuario.situacaoCertificado = original;
      }
    );
  }

  reenviar_certificado(usuario: UsuarioRecebedor) {
    this.usuarioRecebedorService.reenviarCertificado(usuario.id).subscribe(() => {
      this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
    });
  }


  async gerarCredenciais(usuario: UsuarioRecebedor) {
    const { drawerComponent } = await this.drawerService.create({
      component: UsuarioRecebedorCredenciaisComponent,
      size: 'large',
      componentProps: {
        usuRec: usuario.id,
        contatos: usuario.contatos
      }
    });

    drawerComponent.instance.close.subscribe(() => {

    });

  }

  /**
   * Será usado quando o cliente puder enviar o seu próprio certificado.
   * Talvez será usado em um cenário on premise
   * */
  private async drawerCertificado() {
    const { drawerComponent } = await this.drawerService.create({
      component: CertificadoDigitalDrawerComponent,
      size: 'small',
      componentProps: {
        finalidade: 5
      }
    });

    drawerComponent.instance.close.subscribe(() => {
      this.refresh();
    });
  }

  private refresh() {
    this.criarDataSource();
  }

  private criarFiltro() {
    this.filtroForm = this.formBuild.group({});
  }

  private criarDataSource() {
    this.usuarioRecebedorService.obterTodos().subscribe(value => {
      this.values = value;
    });
  }

}
