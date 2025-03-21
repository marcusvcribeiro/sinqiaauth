import { HistoricoFuncoesComponent } from './page/historico-funcoes/historico-funcoes.component';
import { SegService } from './services/seg.service';
import { ModuloSegurancaComponent } from './page/usuarios_grupos/modulo-seguranca.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ModuloSegurancaRoutingModule } from './seguranca-routing.module';
import { SegListaUsuariosComponent } from './component/seg-lista-usuarios/seg-lista-usuarios.component';
import { SegListaGruposComponent } from './component/seg-lista-grupos/seg-lista-grupos.component';
import { SegFormUsuarioComponent } from './component/seg-form-usuario/seg-form-usuario.component';
import { SegFormGrupoComponent } from './component/seg-form-grupo/seg-form-grupo.component';
import { SortByPipe } from './pipe/sort-by.pipe';
import { SegPermissoesGrupoComponent } from './component/seg-permissoes-grupo/seg-permissoes-grupo.component';
import { SegPermissoesUsuarioComponent } from './component/seg-permissoes-usuario/seg-permissoes-usuario.component';
import { SegFuncaoDirective } from './directive/seg-funcao.directive';
import { SegFormUsuarioSenhaComponent } from './component/seg-form-usuario-senha/seg-form-usuario-senha.component';
import { FilterPipe } from './pipe/filter.pipe';
import { HistoricoLoginComponent } from './page/historico-login/historico-login.component';
import { SegListaDicionarioComponent } from './component/seg-lista-dicionario/seg-lista-dicionario.component';
import { SegFormDicionarioComponent } from './component/seg-form-dicionario/seg-form-dicionario.component';
import { HistoricoAlteracaoUsuarioComponent } from './page/historico-alteracao-usuarios/historico-alteracao-usuarios.component';
import { SegFormAlteracaoUsuarioComponent } from './component/seg-form-view-alteracoes-usuario/seg-form-view-alteracoes-usuario.component';



@NgModule({
  imports: [
    ModuloSegurancaRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations:[
    ModuloSegurancaComponent,
    SegListaUsuariosComponent,
    SegListaGruposComponent,
    SegFormUsuarioComponent,
    SegFormAlteracaoUsuarioComponent,
    SegFormGrupoComponent,
    SortByPipe,
    SegPermissoesGrupoComponent,
    SegPermissoesUsuarioComponent,
    SegFuncaoDirective,
    SegFormUsuarioSenhaComponent,
    FilterPipe,
    HistoricoLoginComponent,
    HistoricoFuncoesComponent,
    HistoricoAlteracaoUsuarioComponent,
    SegListaDicionarioComponent,
    SegFormDicionarioComponent
  ],
  exports:[
    SegFuncaoDirective
  ],
  providers: [
    SegService
  ]
})
export class SegurancaModule { }
