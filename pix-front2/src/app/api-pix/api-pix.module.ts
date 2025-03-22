import { NgModule } from '@angular/core';
import { OnboardingComponent } from './page/onboarding/onboarding.component';
import { ApiPixRoutingModule } from './api-pix-routing.module';
import { UsuarioRecebedorListaComponent } from './component/usuario-recebedor-lista/usuario-recebedor-lista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SegurancaModule } from '../seg/seguranca.module';
import { SharedModule } from './../shared/shared.module';
import { SitucaoCertificadoPinPipe } from './pipe/situcao-certificado-pin.pipe';
import { SitucaoCertificadoDescricaoPipe } from './pipe/situcao-certificado-descricao.pipe';
import { CertificadoDigitalModule } from '../certificado-digital/certificado-digital.module';
import { UsuarioRecebedorContatosComponent } from './component/usuario-recebedor-contatos/usuario-recebedor-contatos.component';
import { UsuarioRecebedorFormularioComponent } from './component/usuario-recebedor-formulario/usuario-recebedor-formulario.component';
import { UsuarioRecebedorDrawerComponent } from './component/usuario-recebedor-drawer/usuario-recebedor-drawer.component';
import { UsuarioRecebedorEnderecoComponent } from './component/usuario-recebedor-endereco/usuario-recebedor-endereco.component';
import { UsuarioRecebedorCredenciaisComponent } from './component/usuario-recebedor-credenciais/usuario-recebedor-credenciais.component';
import { UsuRecFormularioDonosComponent } from './component/usu-rec-formulario-donos/usu-rec-formulario-donos.component';
import { UsuRecSelectContatosComponent } from './component/usu-rec-select-contatos/usu-rec-select-contatos.component';
import { UsuRecSelectEscoposComponent } from './component/usu-rec-select-escopos/usu-rec-select-escopos.component';



@NgModule({
  declarations: [
    OnboardingComponent,
    UsuarioRecebedorListaComponent,
    SitucaoCertificadoPinPipe,
    SitucaoCertificadoDescricaoPipe,
    UsuarioRecebedorContatosComponent,
    UsuarioRecebedorFormularioComponent,
    UsuarioRecebedorDrawerComponent,
    UsuarioRecebedorEnderecoComponent,
    UsuarioRecebedorCredenciaisComponent,
    UsuRecFormularioDonosComponent,
    UsuRecSelectContatosComponent,
    UsuRecSelectEscoposComponent
  ],
  imports: [
    ApiPixRoutingModule,
    CertificadoDigitalModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SegurancaModule
  ]
})
export class ApiPixModule { }
