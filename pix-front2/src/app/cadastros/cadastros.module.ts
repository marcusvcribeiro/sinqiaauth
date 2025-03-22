import { SegurancaModule } from './../seg/seguranca.module';
import { ModuloAutorizacaoLiberacaoComponent } from './page/modulo-autorizacao-liberacao/modulo-autorizacao-liberacao.component';
import { ModuloAssociacaoAlcadaGrpUsuarioComponent } from './page/modulo-associacao-alcada-grp-usuario/modulo-associacao-alcada-grp-usuario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListaGruposUsuariosComponent } from './components/composicao-grp-usuario/lista-grupos-usuarios/lista-grupos-usuarios.component';
import { ModuloGruposUsuariosComponent } from './page/grupos_usuarios/modulo-grupos-usuarios.component';
import { ModuloComposicaoGrpUsuarioComponent } from './page/modulo-composicao-grp-usuario/modulo-composicao-grp-usuario.component';
import { ModuloNivelHierarquicoComponent } from './page/modulo-nivel-hierarquico/modulo-nivel-hierarquico.component';
import { ModuloParticipanteIndiretoComponent } from './page/modulo-participante-indireto/modulo-participante-indireto.component';

import { FilterPipe } from './pipe/filter.pipe';

import { ModuloCadastrosRoutingModule } from './cadastros-routing.module';
import { CompFormUsuarioComponent } from './components/composicao-grp-usuario/comp-form-usuario/comp-form-usuario.component';
import { CompListaUsuariosComponent } from './components/composicao-grp-usuario/comp-lista-usuarios/comp-lista-usuarios.component';
import { GrpUsuarioFormComponent } from './components/composicao-grp-usuario/grp-usuario-form/grp-usuario-form.component';
import { EditarNivelHierarquicoFormComponent } from './components/nivel-hierarquico/editar-nivel-hierarquico-form/editar-nivel-hierarquico-form.component';
import { ListaNivelHierarquicoComponent } from './components/nivel-hierarquico/lista-nivel-hierarquico/lista-nivel-hierarquico.component';
import { NivelHierarquicoFormComponent } from './components/nivel-hierarquico/nivel-hierarquico-form/nivel-hierarquico-form.component';
import { UsuariosGrupoVisualizacaoComponent } from './components/composicao-grp-usuario/usuarios-grupo-visualizacao/usuarios-grupo-visualizacao.component';
import { GruposUsuarioVisualizacaoComponent } from './components/composicao-grp-usuario/grupos-usuario-visualizacao/grupos-usuario-visualizacao.component';
import { UsuariosGrupoAdicionarComponent } from './components/composicao-grp-usuario/usuarios-grupo-adicionar/usuarios-grupo-adicionar.component';
import { GruposUsuarioAdicionarComponent } from './components/composicao-grp-usuario/grupos-usuario-adicionar/grupos-usuario-adicionar.component';
import { SharedModule } from '../shared/shared.module';
import { SelecaoComposicaoOperacaoComponent } from './components/associacao-alcada-grp-usuario/selecao-composicao-operacao/selecao-composicao-operacao.component';
import { AssociacaoInclusaoComponent } from './components/associacao-alcada-grp-usuario/associacao-inclusao/associacao-inclusao.component';
import { AssociacaoLiberacaoComponent } from './components/associacao-alcada-grp-usuario/associacao-liberacao/associacao-liberacao.component';
import { AssociacaoConsultaComponent } from './components/associacao-alcada-grp-usuario/associacao-consulta/associacao-consulta.component';
import { SelecaoComposicaoAutorizacaoComponent } from './components/autorizacao-libecarao/selecao-composicao-autorizacao/selecao-composicao-autorizacao.component';
import { GruposUsuarioEditarComponent } from './components/composicao-grp-usuario/grupos-usuario-editar/grupos-usuario-editar.component';
import { AssociacaoCadastrarComponent } from './components/associacao-alcada-grp-usuario/associacao-cadastrar/associacao-cadastrar.component';
import { AssociacaoEditarComponent } from './components/associacao-alcada-grp-usuario/associacao-editar/associacao-editar.component';
import { AdicionarAutorizacaoLiberacaoComponent } from './components/autorizacao-libecarao/adicionar-autorizacao-liberacao/adicionar-autorizacao-liberacao.component';
import { EditarAutorizacaoLiberacaoComponent } from './components/autorizacao-libecarao/editar-autorizacao-liberacao/editar-autorizacao-liberacao.component';
import { ListaAutorizacaoLiberacaoComponent } from './components/autorizacao-libecarao/lista-autorizacao-liberacao/lista-autorizacao-liberacao.component';
import { EditarParticipanteIndiretoFormComponent } from './components/participante-indireto/editar-participante-indireto-form/editar-participante-indireto-form.component';
import { ListaParticipanteIndiretoComponent } from './components/participante-indireto/lista-participante-indireto/lista-participante-indireto.component';
import { ParticipanteIndiretoFormComponent } from './components/participante-indireto/participante-indireto-form/participante-indireto-form.component';
import { AcessoParticipanteIndiretoListaComponent } from './components/participante-indireto/acesso-participante-indireto-lista/acesso-participante-indireto-lista.component';

@NgModule({
  declarations: [
    ListaGruposUsuariosComponent,
    ModuloGruposUsuariosComponent,
    GrpUsuarioFormComponent,
    ModuloComposicaoGrpUsuarioComponent,
    ModuloNivelHierarquicoComponent,
    ListaNivelHierarquicoComponent,
    NivelHierarquicoFormComponent,
    FilterPipe,
    CompListaUsuariosComponent,
    CompFormUsuarioComponent,
    EditarNivelHierarquicoFormComponent,
    UsuariosGrupoVisualizacaoComponent,
    GruposUsuarioVisualizacaoComponent,
    UsuariosGrupoAdicionarComponent,
    GruposUsuarioAdicionarComponent,
    ModuloAssociacaoAlcadaGrpUsuarioComponent,
    ModuloAutorizacaoLiberacaoComponent,
    SelecaoComposicaoOperacaoComponent,
    AssociacaoInclusaoComponent,
    AssociacaoLiberacaoComponent,
    AssociacaoConsultaComponent,
    SelecaoComposicaoAutorizacaoComponent,
    GruposUsuarioEditarComponent,
    AssociacaoCadastrarComponent,
    AssociacaoEditarComponent,
    AdicionarAutorizacaoLiberacaoComponent,
    EditarAutorizacaoLiberacaoComponent,
    ListaAutorizacaoLiberacaoComponent,
    ModuloParticipanteIndiretoComponent,
    ListaParticipanteIndiretoComponent,
    ParticipanteIndiretoFormComponent,
    EditarParticipanteIndiretoFormComponent,
    AcessoParticipanteIndiretoListaComponent
  ],
  imports: [
    ModuloCadastrosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SegurancaModule
  ]
})
export class CadastrosModule { }
